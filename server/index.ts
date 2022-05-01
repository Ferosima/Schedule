import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import user_router from "./src/routes/user.route";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();

// Set the server port
const port = process.env.PORT;
// Cors option
const cors_options = {
  origin: `http://localhost:${port}`,
};
// Use cors
app.use(cors(cors_options));

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse requests of content-type - application/jsons
app.use(bodyParser.json());

// Define root route
app.get("/api", (req: Request, res: Response) => {
  res.send("Schedule api root");
});

// Define User router
app.use("/api/user", user_router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
