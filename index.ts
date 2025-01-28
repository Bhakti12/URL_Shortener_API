import express from 'express';
import expressOasGenerator from 'express-oas-generator';
import swaggerConfig from './lib/config/swagger_config';

const app = express();

const port = 3000;

expressOasGenerator.handleResponses(app, swaggerConfig);

app.get('/', (req, res) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

expressOasGenerator.handleRequests();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});