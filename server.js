const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connection is successful"));

const port = process.env.port || 3000;
const server = app.listen(port, () =>
  console.log(`application is listening on port ${port}`)
);
