import express, { json } from 'express';
import "reflect-metadata";
import { DatabaseConnection } from './lib/config/mongoConfig';
import bodyParser from 'body-parser';
import swaggerConfig from './lib/config/swagger_config';
import expressOasGenerator from 'express-oas-generator';
import indexRouter from './lib/route/indexRoute';
import { config } from './lib/config/config';
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from '../docs/swagger_output.json';

const app = express();

expressOasGenerator.handleResponses(app, swaggerConfig);

app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

DatabaseConnection();

app.use('/analytics', indexRouter.analyticsRouter);
app.use('/url', indexRouter.urlRouter);
app.use('/auth', indexRouter.gAuthRouter);
// app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

expressOasGenerator.handleRequests();

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
});