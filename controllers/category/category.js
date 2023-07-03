const Category = require("../../model/Category");
exports.addCategory = async (req, res) => {
  try {
    let checkCategory = await Category.findOne({
      name: req.body.name,
      deleted: false,
    });
    if (checkCategory)
      return res.status(200).json({
        message: `Category with this name ${req.body.name} already exist`,
      });
    console.log(req.body.name, req.body.description);
    let category = Category.create({
      name: req.body.name,
      description: req.body.description,
    });
    return res
      .status(200)
      .json({ data: category, message: "category added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.getCategory = async (req, res) => {
  try {
    let category = await Category.find({
      deleted: false,
    });

    return res
      .status(200)
      .json({ data: category, message: "list of all categories " });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
