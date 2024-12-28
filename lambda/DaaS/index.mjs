import DAASClient from "./daasClient.mjs";
import { CONFIG } from "../constants/index.mjs";

// Instantiate the DAAS client using the CONFIG object
const client = new DAASClient({
  publicKey: CONFIG.DAAS_PUBLIC_KEY,
  privateKey: CONFIG.DAAS_PRIVATE_KEY,
  baseUrl: CONFIG.DAAS_BASE_URL,
});

export const handler = async (event) => {
  try {
    console.log(JSON.stringify(event, null, 2));

    // Example: Call the getVinInfo function
    const data = await client.getVinInfo();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
