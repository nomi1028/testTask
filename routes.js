const AuthRoutes = require("./routes/auth/auth");
const product = require("./routes/product/product");
const order = require("./routes/order/order");
const category = require("./routes/category/category");
module.exports = function (app) {
  app.use("/user", AuthRoutes);
  app.use("/product", product);
  app.use("/order", order);
  app.use("/category", category);
};
