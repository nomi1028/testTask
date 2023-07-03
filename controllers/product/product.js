const Category = require("../../model/Category");
const Product = require("../../model/Product");
const User = require("../../model/User");

exports.addProduct = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.category_id ||
      !req.body.manager_id ||
      !req.body.price ||
      !req.body.quantity
    )
      return res.status(400).json({
        message:
          "name & category_id && manager_id && price && quantity are required parameters for request",
      });
    let checkProduct = await Product.findOne({
      name: req.body.name,
      deleted: false,
    });

    if (checkProduct)
      return res.status(200).json({
        message: `product with this name ${req.body.name} already exist`,
      });
    let checkCategory = await Category.findOne({
      _id: req.body.category_id,
    });

    if (!checkCategory) {
      return res.status(200).json({
        message: "Category not found",
      });
    }

    let product = Product.create({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      category_id: req.body.category_id,
      manager_id: req.body.manager_id,
      Remaining_quantity: req.body.quantity,
      price: req.body.price,
    });

    return res
      .status(200)
      .json({ data: product, message: "Product added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.getAllProduct = async (req, res) => {
  try {
    let product = await Product.find({
      deleted: false,
    }).populate([{ path: "category_id" }, { path: "manager_id" }]);

    return res
      .status(200)
      .json({ data: product, message: "list of all product " });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.getProductById = async (req, res) => {
  try {
    let product = await Product.findById({
      status: "checkedOut",
      _id: req.params.id,
    }).populate([{ path: "category_id" }, { path: "manager_id" }]);
    if (!product)
      return res
        .status(404)
        .json({ message: `no Product exists against id: ${req.params.id}` });
    return res.status(200).json({
      data: product,
      message: `Product against this id: ${req.params.id} `,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the required fields are present
    if (
      !req.body.name ||
      !req.body.category_id ||
      !req.body.manager_id ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res.status(400).json({
        message:
          "name, category_id, manager_id, price, and quantity are required parameters for the request",
      });
    }

    // Find the product by ID
    let product = await Product.findById(productId).populate("category_id");

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the name is already taken by another product
    if (product.name !== req.body.name) {
      let checkProduct = await Product.findOne({
        name: req.body.name,
        deleted: false,
      });

      if (checkProduct) {
        return res.status(400).json({
          message: `Product with the name ${req.body.name} already exists`,
        });
      }
    }

    // Check if the category exists
    let checkCategory = await Category.findOne({
      _id: req.body.category_id,
    });

    if (!checkCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Check if the manager exists and has the role of "manager"
    let checkManager = await User.findOne({
      _id: req.body.manager_id,
      role: "manager",
    });

    if (!checkManager) {
      return res
        .status(400)
        .json({ message: "Only managers can update products" });
    }

    // ///////////////////
    product.name = req.body.name;
    product.description = req.body.description;
    product.Remaining_quantity =
      product.Remaining_quantity +
      (Number(req.body.quantity) - Number(product.quantity));
    product.quantity = req.body.quantity;

    product.manager_id = req.body.manager_id;
    product.price = req.body.price;

    // Save the updated product
    // await product.save();

    return res
      .status(200)
      .json({ data: product, message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.restokeProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the required fields are present
    if (
      !req.body.name ||
      !req.body.category_id ||
      !req.body.manager_id ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res.status(400).json({
        message:
          "name, category_id, manager_id, price, and quantity are required parameters for the request",
      });
    }

    // Find the product by ID
    let product = await Product.findById(productId).populate("category_id");

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the name is already taken by another product

    // Check if the category exists
    let checkCategory = await Category.findOne({
      _id: req.body.category_id,
    });

    if (!checkCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Check if the manager exists and has the role of "manager"
    let checkManager = await User.findOne({
      _id: req.body.manager_id,
      role: "manager",
    });

    if (!checkManager) {
      return res
        .status(400)
        .json({ message: "Only managers can update products" });
    }

    // Restoke product data
    product.quantity =
      Number(product.Remaining_quantity) + Number(req.body.quantity);
    product.Remaining_quantity = product.quantity;

    await product.save();

    return res
      .status(200)
      .json({ data: product, message: "Product restoke successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
