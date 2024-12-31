import crypto from 'crypto';
import axios from 'axios';
import { logger } from '../../src/server.mjs';

class DAASClient {
  constructor({ publicKey, privateKey, baseUrl }) {
    if (!publicKey || !privateKey || !baseUrl) {
      throw new Error('Public key, private key, and base URL are required');
    }
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Generate query string authentication parameters
   * @param {string} uriPath - API endpoint path
   * @param {string} httpVerb - HTTP method (GET, POST, etc.)
   * @returns {Object} - Query string parameters for authentication
   */
  generateQueryStringAuth(uriPath, httpVerb) {
    const epoch = Math.floor(Date.now() / 1000); // Current Unix timestamp
    const signatureData = `${this.publicKey}\n${httpVerb}\n${epoch}\n${uriPath}`;
    const hash = crypto
      .createHmac('sha256', this.privateKey)
      .update(signatureData)
      .digest('base64');

    return {
      Scheme: 'Shared',
      XDate: epoch,
      ApiKey: this.publicKey,
      Sig: encodeURIComponent(hash), // Ensure proper URI encoding
    };
  }

  /**
   * Make an API request with query string authentication
   * @param {string} httpVerb - HTTP method (GET, POST, etc.)
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters or body
   * @returns {Promise} - Axios response promise
   */
  async request(httpVerb, endpoint, params = {}) {
    const uriPath = new URL(endpoint, this.baseUrl).pathname;
    const authParams = this.generateQueryStringAuth(uriPath, httpVerb);

    // Build the full URL with authentication and query parameters
    const url = new URL(this.baseUrl + endpoint);
    Object.entries({ ...params, ...authParams }).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const config = {
      method: httpVerb.toLowerCase(),
      url: url.toString(),
      headers: { 'Content-Type': 'application/json' }, // Optional, based on API requirements
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response) {
        logger.error(
          `Error: ${error.response.status} - ${error.response.data}`
        );
      }
      throw error;
    }
  }

  // Example methods for specific API interactions
  async getVinInfo() {
    return this.request('GET', '/Information/Vehicles/Search/ByVIN');
  }
}

export default DAASClient;

