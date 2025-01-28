import { SPEC_OUTPUT_FILE_BEHAVIOR } from 'express-oas-generator';
import _ from 'lodash';

const swaggerConfig = {

    //TODO - Add proper authentication method for below code
  predefinedSpec: function (spec: any) {
    return spec;
  },
  swaggerUiServePath: '/api-docs/',
  specOutputPath: 'lib/docs/swagger_output.json',
  alwaysServeDocs: true,
  tags: ['url'],
  specOutputFileBehavior: SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
  swaggerDocumentOptions: {}
};

export default swaggerConfig;
