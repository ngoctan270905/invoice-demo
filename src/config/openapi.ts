export const openApiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Invoice Demo API',
    version: '1.0.0',
    description: 'API documentation for Invoice Demo backend',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Check API health',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'API is running',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                    },
                    service: {
                      type: 'string',
                      example: 'iam-invoice-demo',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/demo': {
      get: {
        summary: 'Get demo API response',
        tags: ['Demo'],
        responses: {
          '200': {
            description: 'Demo response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hello from pure Node.js + TypeScript API',
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
