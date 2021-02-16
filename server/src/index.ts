require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import history from "connect-history-api-fallback";

import authRoutes from "./routes/auth.routes";
import dataRoutes from "./routes/data.routes";

const app = express();
const port: string | undefined | number = process.env.PORT || 3001;

const staticFileMiddleware = express.static("./frontend/dist");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: true,
  }),
);
app.use(staticFileMiddleware);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
