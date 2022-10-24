require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(cors());
app.use(express.json());

const routes = require("./routes/routes");

app.use("/api/users", routes);

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
app.listen(4000, () => {
  console.log(`Server Started at ${4000}`);
});
