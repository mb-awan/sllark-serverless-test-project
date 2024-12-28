# 🚀 AWS Lambda Function for Wheel Alignment API

## 📚 Project Overview

This project implements an AWS Lambda function for managing wheel alignment sessions. It includes error handling, DynamoDB integration, and unit tests for robust functionality.


## 🛠️ Getting Started

### Step 1: ⚙️ Environment Configuration

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd lambda
   ```

2. **Set Up Environment Variables**:
   - Create a `.env` file by copying `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with the following details:
     ```env
     AWS_REGION=<your-aws-region>
     NODE_ENV=dev
     API_BASE_URL=https://api.example.com/v1
     DAAS_PUBLIC_KEY=<your-public-key>
     DAAS_PRIVATE_KEY=<your-private-key>
     DAAS_BASE_URL=https://daas-api.example.com
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

---

### Step 2: 🏃‍♂️ Running the Project Locally

1. **Set Up AWS SAM CLI**:
   - Install the AWS SAM CLI: [Install Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html).
   - Run the following command to verify:
     ```bash
     sam --version
     ```

2. **Run the Lambda Function Locally**:
   - Create a test event file `event.json`:
     ```json
     {
       "request": {
         "userAttributes": {
           "email": "test@example.com",
           "name": "Test User"
         }
       },
       "userName": "test-user"
     }
     ```
   - Use SAM CLI to invoke the function:
     ```bash
     sam local invoke "MyLambdaFunction" -e event.json
     ```

3. **Test Using Mock DynamoDB**:
   - Install and run [DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) to simulate the database locally.
   - Update `.env` to point to the local DynamoDB endpoint.

---

### Step 3: 🚀 Deploying to AWS

1. **Zip the Function**:
   ```bash
   npm run zipUp
   ```

2. **Deploy the Function**:
   - Create an AWS Lambda function:
     ```bash
     aws lambda create-function \
       --function-name WheelAlignmentLambda \
       --runtime nodejs22.x \
       --role arn:aws:iam::your-role-arn \
       --handler cognito/index.handler \
       --zip-file fileb://lambda-function.zip
     ```

3. **Set Up API Gateway**:
   - Create an API Gateway with endpoints `/alignments` (GET, POST) as specified in the Swagger file.

4. **Create DynamoDB Tables**:
   - Example for `users_table`:
     ```bash
     aws dynamodb create-table \
       --table-name users_table \
       --attribute-definitions AttributeName=userId,AttributeType=S \
       --key-schema AttributeName=userId,KeyType=HASH \
       --billing-mode PAY_PER_REQUEST
     ```

---

## 🧪 Unit Testing

1. **Run Tests**:
   ```bash
   npm test
   ```

2. **Example Test Command**:
   - Unit test script located in `tests` folder:
     ```bash
     jest --config=jest.config.js
     ```

---

## 🔄 Project Structure

```plaintext
📁 lambda
├── 📁 cognito
│   └── index.mjs         # Cognito Lambda Handler
├── 📁 constants          # Contains constants for API responses, environment, etc.
├── 📁 DaaS
│   ├── daasClient.mjs    # DaaS API Client
│   └── index.mjs         # DaaS Lambda Handler
├── .env                  # Environment Variables
├── .env.example          # Environment Variables Template 
├── package.json          # Node.js Dependencies
├── API.yml               # Swagger API Specification
└── README.md             # Project Documentation
```

---

## 💡 Tips and Best Practices

- **Environment Management**:
  - Never commit `.env` files to version control.
  - Use `.env.example` for sharing environment variable templates.

- **Error Handling**:
  - Always log detailed errors in development.
  - Use generic error messages for production.

- **Testing**:
  - Cover edge cases like missing data, invalid inputs, and DynamoDB errors.
  - Use mocking libraries to test AWS services locally.

---

## 🤔 Troubleshooting

- **Common Errors**:
  - _"Access Denied"_: Check IAM permissions for the Lambda function.
  - _"DynamoDB Table Not Found"_: Ensure the table exists and the correct region is specified.

- **Debugging**:
  - Use `sam logs` to view logs for local runs:
    ```bash
    sam logs -n MyLambdaFunction
    ```

---