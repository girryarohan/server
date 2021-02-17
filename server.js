const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
// require("dotenv").config();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const connectionURL = "mongodb://localhost:27017/ecom";
// app
const app = express();
console.log(connectionURL);
// db
mongoose
  .connect(process.env.DATABASE || connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`DB CONNECTION ERR ${err}`));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "3mb" }));
app.use(cors());

// routes
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// listen port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log("server is running on ", port));
