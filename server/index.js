require("dotenv").config();
const express = require("express");
const connection = require("./db");
const app = express();
const cors = require("cors");
const taskRoutes = require("./routes/task");

connection();
app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
