const AuthRoutes = require("./routes/auth/auth");
const product = require("./routes/product/product");
const order = require("./routes/order/order");
const category = require("./routes/category/category");
const feedback = require("./routes/feedback/feedback");
module.exports = function (app) {
  app.use("/user", AuthRoutes);
  app.use("/product", product);
  app.use("/order", order);
  app.use("/category", category);
  app.use("/feedback", feedback);
};
