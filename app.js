const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
connectDB();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
require("./routes")(app);

app.use((req, res, next) => {
  res.status(404).json({
    message: "bad Request",
  });
});
module.exports = app;
