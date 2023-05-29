const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://test_task:test_task@db.e6le9.mongodb.net/testing?retryWrites=true&w=majority"
  );

  mongoose.connection.on("error", (err) => {
    console.log("not connected");
  });
  mongoose.connection.on("connected", (connected) => {
    console.log("yes connected");
  });
};

module.exports = connectDB;
