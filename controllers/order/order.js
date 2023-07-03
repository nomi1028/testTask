const User = require("../../model/User");
const mongoose = require("mongoose");
require("dotenv/config");
const GenerateToken = require("../../middleware/generateToken");
const transporter = require("../../middleware/sendmail");
const bcrypt = require("bcrypt");
const Product = require("../../model/Product");
const Order = require("../../model/Order");

exports.addOrder = async (req, res) => {
  try {
    if (!req.body.customer_id || !req.body.products)
      return res
        .status(400)
        .json({ message: "customer Id and  products require" });

    let products = JSON.parse(req.body.products);

    for (const product of products) {
      let checkProduct = await Product.findOne({
        _id: product.product_id.toString(),
      });
      if (!checkProduct)
        return res.status(404).json({
          message: `no product exists against id: ${product.service_id}`,
        });
    }

    Order.findOneAndUpdate(
      { customer_id: req.body.customer_id, status: "pending" },
      {
        customer_id: req.body.customer_id,
        products: JSON.parse(req.body.products),
      },
      { new: true, upsert: true },
      async (err, updatedBooking) => {
        if (err) return res.status(500).json({ err });
        await updatedBooking.populate([
          { path: "customer_id" },
          {
            path: "products.product_id",

            populate: { path: "manager_id" },
          },
        ]);
        if (req.body?.checkout) {
          await updatedBooking.updateOne({
            status: "checkedOut",
            address: req.body.address,
          });
          let mailOptions = [
            {
              from: process.env.EMAIL,
              to: updatedBooking.customer_id.email,
              subject: "Order Confirmation",
              text: `Order confirmation
                `,
            },
          ];

          for (const product of updatedBooking.products) {
            let IsEmail = mailOptions.find((data) => {
              if (data.to == product.product_id.manager_id.email) {
                return true;
              }
            });
            if (!IsEmail) {
              mailOptions.push({
                from: process.env.EMAIL,
                to: product.product_id.manager_id.email,
                subject: "Order Confirmation",
                text: `Order confirmation
                `,
              });
            }
          }

          for (const mailOption of mailOptions) {
            transporter.sendMail(mailOption, (error) => {
              if (error) {
                return res.json({ message: error.message });
              }
            });
          }
        }
        return res
          .status(200)
          .json({ message: `cart updated successfully`, data: updatedBooking });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.getallOrder = async (req, res) => {
  try {
    let orderList = await Order.find({ status: "checkedOut" }).populate([
      { path: "customer_id" },
      {
        path: "products.product_id",
        // select: "name price", // Select only specific fields to populate
        populate: { path: "manager_id" },
      },
    ]);

    return res.status(200).json({ message: "All Order List", data: orderList });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.getallOrderofMananger = async (req, res) => {
  try {
    const managerId = req.params.id.toString(); // Assuming you pass the managerId as a parameter

    const orders = await Order.aggregate([
      {
        $match: {
          status: "checkedOut",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product_id",
          foreignField: "_id",
          as: "productsData",
        },
      },
      {
        $match: {
          "productsData.manager_id": mongoose.Types.ObjectId(managerId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
    ]);

    return res
      .status(200)
      .json({ message: "Orders by Manager ID", data: orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.getallOrderofCustomer = async (req, res) => {
  try {
    const orders = await Order.find({
      customer_id: req.params.id,
      status: "checkedOut",
    });

    return res
      .status(200)
      .json({ message: "Orders by Customer ID", data: orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.removeProduct = async (req, res) => {
  try {
    if (!req.body.customer_id || !req.body.product_id)
      return res
        .status(400)
        .json({ message: "customerID & productId are required" });

    let booking = await Order.findOne({
      customer_id: req.body.customer_id,
      status: "pending",
    });
    if (!booking)
      return res.status(404).json({
        message: "no order exists against user id:" + req.body.customer_id,
      });
    let product = booking.products.find(
      (x) => x._id.toString() == req.body.product_id.toString()
    );
    if (!product)
      return res.status(404).json({
        message: "no product exists against id: " + req.body.product_id,
      });

    Order.findOneAndUpdate(
      { customer_id: req.body.customer_id },
      {
        $pull: { products: { _id: product._id } },
      },
      { new: true },
      async (err, updatedBooking) => {
        if (err)
          return res
            .status(500)
            .json({ message: `error occurred while updating cart` });
        // await updatedBooking;
        return res.status(200).json({
          message: `item removed from cart successfully`,
          data: updatedBooking,
        });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
