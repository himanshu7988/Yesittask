require("dotenv").config();
require("./global_functions");
require("./src/config/global_config");
const express = require("express");
const mongoose = require('mongoose');
const logger = require('./src/middlewares/logger');
const PORT = process.env.PORT || 4001;
const app = express();

// Configure CORS options
const corsOptions = {
  origin: "*",
};

// cors policy

const cors = require("cors");
app.use(cors(corsOptions));

// configure the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

var routers = require("./src/routes");
app.use("/", routers);

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });
  })
  .catch((err) => console.error(err));
