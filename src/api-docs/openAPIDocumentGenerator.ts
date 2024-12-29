import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';


import { authRegistry } from '@/api/auth/authDocs';
import { healthCheckRegistry } from '@/api/healthCheck/healthCheckRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    authRegistry,
  ]);

  // Register the security scheme
  registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'AWS Lambda Function for Wheel Alignment API Demo',
      description: 'API for the Wheel Alignment iOS App',
      
    },
    externalDocs: {
      description: 'API Documentation',
      url: '/swagger.json',
    },
  });
}