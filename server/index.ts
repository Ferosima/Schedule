import express, { Express, Request, Response } from 'express';
import user_router from './src/routes/user.route';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config.json';
import knex from 'knex';

const app: Express = express();
// Set the server port
const port = config.port;
// Cors option
const cors_options = {};
// Use cors
app.use(cors(cors_options));

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse requests of content-type - application/jsons
app.use(bodyParser.json());

// Define root route
app.get('/api', (req: Request, res: Response) => {
  res.send('Schedule api root');
});

// Define User router
app.use('/api/user', user_router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
