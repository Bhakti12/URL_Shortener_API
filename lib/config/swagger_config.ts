import { SPEC_OUTPUT_FILE_BEHAVIOR } from "express-oas-generator";
import _ from "lodash";

export const swaggerConfig = {
  predefinedSpec: function (spec: any) {
    return spec;
  },
  swaggerUiServePath: '/api-docs/',
  specOutputPath: 'lib/docs/swagger_output.json',
  ignoredNodeEnvironments: ['production', 'qa'],
  alwaysServeDocs: false,
  tags: ['items', 'orders'],
  specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
  swaggerDocumentOptions: {
    swaggerOptions: {
      docExpansion: "none", // Example of a valid Swagger UI option
      defaultModelsExpandDepth: -1,
    },
    customCss: ".swagger-ui .topbar { display: none }", // Example customization
    customSiteTitle: "My API Docs"
  },
};

export default swaggerConfig;
