import { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import _ from 'lodash';

export const swaggerConfig = {
  predefinedSpec: function (spec: any) {
    _.set(spec, 'securityDefinitions.bearerAuth', {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: "Please enter your token with 'Bearer ' prefix (e.g., 'Bearer your-token-here').",
    });
    _.set(spec, 'security', [{ bearerAuth: [] }]);
    _.set(spec, 'schemes', ['https', 'http']);
    return spec;
  },
  swaggerUiServePath: '/api-docs/',
  specOutputPath: 'lib/docs/swagger_output.json',
  ignoredNodeEnvironments: ['production', 'qa'],
  alwaysServeDocs: false,
  tags: ['items', 'orders'],
  specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
  swaggerDocumentOptions: {  // Add this line
    info: {
      title: 'My API',
      description: 'API documentation',
      version: '1.0.0',
    },
    basePath: '/api',
    consumes: ['application/json'],
    produces: ['application/json'],
  },
};

export default swaggerConfig;
