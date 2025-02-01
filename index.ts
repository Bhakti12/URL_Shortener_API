import express, { json } from 'express';
import { DatabaseConnection } from './lib/config/mongoConfig';
import bodyParser from 'body-parser';

const app = express();

app.use(json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

DatabaseConnection();

app.get('/', (req, res) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

expressOasGenerator.handleRequests();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});