const { MongoClient } = require("mongodb");
// const nextConfig = require("./next.config");
const moment = require("moment");

const user = {
  name: "super admin",
  email: "admin@ecommerce.com",
  phone_number: null,
  password: "$2a$10$6wuqZg4nCxBYRFJbqJfiI.QwqfYvYtoh2HQnjJZOMHljjpOinw36G",
  role: "admin",
  verified: true,
  block: false,
  created_at: moment().format(),
  updated_at: moment().format(),
};

const connectDB = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://test_task:test_task@db.e6le9.mongodb.net/testing?retryWrites=true&w=majority",
    {
      useUnifiedTopology: false,
      useNewUrlParser: true,
    }
  );
  return client;
};
const seedDB = async () => {
  try {
    if (process.argv[2] === "-d") {
      const client = await connectDB();
      await client.db().dropDatabase();
      console.log("Database dropped");
      process.exit();
    }

    if (process.argv[2] === "-i") {
      const client = await connectDB();
      console.log("db connected");
      await client.db().collection("users").insertOne(user);
      console.log("Database ininitialized");

      process.exit();
    }
    console.log("Invalid command");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

seedDB();
