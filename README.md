# 🚀 AWS Lambda Function for Wheel Alignment API

This project implements a highly modular AWS Lambda function for managing wheel alignment sessions. It includes integration with **DynamoDB**, **Swagger APIs**, with automated setup scripts for efficient deployment.


## 📚 Project Overview

- **DynamoDB Integration**: Automatically creates required tables and indexes during the setup process and proper logging.
- **API Documentation**: Swagger API documentation is available at `/api/docs`.
- **Robust Error Handling**: Centralized error handling with rate limiting and authentication middleware.
- **Automated Deployment**: Includes scripts to package files for deploy to AWS Lambda.

---

## 🛠️ Getting Started

### Prerequisites

1. **Install AWS CLI**:
   Ensure the AWS CLI is installed and configured. Run the following commands to verify:
   ```bash
   aws --version
   aws configure
   ```
   Provide your `AWS Access Key`, `Secret Key`, `Default Region`, and `Output Format`.

2. **Install Node.js**:
   Ensure you have Node.js installed (preferably v22+). Verify using:
   ```bash
   node -v
   npm -v
   ```

3. **Install Dependencies**:
   Clone the repository and install project dependencies:
   ```bash
   npm install
   ```

---

### Step 1: ⚙️ Environment Configuration

1. **Set Up Environment Variables**:
   - Create a `.env` file from the template:
     ```bash
     cp .env.example .env
     ```
   - Fill in the required values in `.env`. For example:
     ```env
     AWS_REGION=ap-south-1
     CORS_ORIGIN=http://localhost:3000;https://example.com
     NODE_ENV=development
     PORT=4000
     HOST=localhost
     JWT_SECRET_KEY=<your-secret-key>
     JWT_EXPIRES_IN=7d
     BCRYPT_SALT_ROUNDS=10
     COMMON_RATE_LIMIT_WINDOW_MS=60000
     COMMON_RATE_LIMIT_MAX_REQUESTS=100
     ```

---

### Step 2: 🏗️ Local Development

To run the project locally:

1. **Start the Local Server**:
   ```bash
   npm run dev
   ```

2. **Local DynamoDB Configuration**:
   Ensure your AWS CLI is properly configured to point to a live DynamoDB instance.

---

### Step 3: 🚀 Deploy to AWS

1. **Package the Lambda Function**:
   Use the included script to zip the required files for deployment:
   ```bash
   npm run deploy
   ```
   This creates a `lambda.zip` file containing the source code.

2. **Upload to Lambda**:
   - Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda/).
   - Create a new function or update an existing one.
   - Upload the `lambda.zip` file.

3. **API Gateway Configuration**:
   - Set up API Gateway as lambda trigger.

4. **Verify the Deployment**:
   Test the endpoints using tools like **Postman** or **Swagger UI**.

---

## 📂 Project Structure

```plaintext
📁
├── 📁 scripts                 # Utility scripts for deployment
│   └── zip-folder.mjs         # Automates packaging of the Lambda function
├── 📁 src                     # Main source code
│   ├── 📁 api                 # API layer
│   │   ├── 📁 api-docs        # Swagger documentation
│   │   │   ├── openAPIDocumentGenerator.mjs
│   │   │   ├── openAPIResponseBuilders.mjs
│   │   │   ├── openAPIRouter.mjs
│   │   │   ├── 📁 alignments  # Alignment-related API documentation
│   │   │   ├── 📁 auth        # Authentication-related API documentation
│   │   │   └── 📁 healthCheck # Health check APIs
│   ├── 📁 commons             # Shared utilities, middleware, and constants
│   │   ├── 📁 constants       # Constants used across the application
│   │   ├── 📁 db              # DynamoDB operations and configuration
│   │   ├── 📁 middleware      # Middleware (e.g., rate limiter, error handler)
│   │   └── 📁 utils           # Utility functions
│   ├── index.mjs              # Entry point for the Lambda function
│   ├── router.mjs             # Main router for API routes
│   ├── server.mjs             # Express server configuration (if needed locally)
│   └── serverless.js          # Serverless framework configuration (optional)
├── .env.example               # Template for environment variables
├── .gitignore                 # Git ignore file
├── lambda.zip                 # Packaged Lambda zip file
├── package-lock.json          # Node.js dependencies lock file
├── package.json               # Node.js dependencies and scripts
└── README.md                  # Project documentation
```

---

## 🔧 Automated Table Creation

- During deployment or local startup, the required DynamoDB tables will be automatically created if they do not already exist.
- Indexes will also be set up as defined in the `dynamoDBConfig.mjs` file.

---

## 🧪 Unit Testing

1. **Run Tests**:
   ```bash
   npm test
   ```

## 🌟 Swagger Documentation

- Swagger APIs are hosted at `/api/docs`.
- Use `openAPIDocumentGenerator.mjs` to customize the API documentation dynamically.

---

## 💡 Tips and Best Practices

- **Environment Management**:
  - Never commit `.env` files to version control.
  - Use `.env.example` for sharing environment variable templates.

- **Error Handling**:
  - Log detailed errors during development.
  - Use generic error messages in production.

- **Rate Limiting**:
  - Use `rateLimiter.mjs` to prevent abuse of your API.

- **Security**:
  - Rotate your `JWT_SECRET_KEY` regularly.
  - Secure sensitive API keys in AWS Secrets Manager.

---

## 🤔 Troubleshooting

- **Access Denied Errors**:
  - Ensure the Lambda function has the correct IAM role permissions to access DynamoDB.
  - Add `ListTables` action to your role for debugging.

- **CORS Issues**:
  - Verify the `CORS_ORIGIN` values in your `.env` file match the origin of your client application.

- **DynamoDB Table Not Found**:
  - Ensure the tables are created in the correct AWS region.

---