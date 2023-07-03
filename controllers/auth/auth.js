const User = require("../../model/User");
require("dotenv/config");
const GenerateToken = require("../../middleware/generateToken");
const transporter = require("../../middleware/sendmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateRandomPassword = require("../../utils/generateRandomPassword");
exports.register = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.role || !userData.password || !userData.email)
      return res.status(400).json({
        message: "role & email are required parameters for request",
      });
    if (userData.role == "manager" || userData.role == "admin")
      return res.status(400).json({
        message: "manager and admin cannot be registered directly",
      });
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(409).json({ message: "Email is already exist" });
    }
    let password = await generatePassword(userData.password);
    let profile = await User.create({
      name: userData.name,
      email: userData.email,
      password: password,
      role: userData.role,
      phone_number: userData.phone_number,
    });

    const token = GenerateToken(profile);
    let mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Activation Link",
      text: `
               please click on below link to activate your account \n
              http://localhost:3000/user/activate/${token} `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res
          .status(200)
          .json({ message: "Please check your email account and verify it" });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.registerManager = async (req, res) => {
  try {
    const manager = req.body;
    if (!manager.name || !manager.email) {
      return res
        .status(404)
        .json({ message: "name,email and password are required parameters" });
    }
    const isExist = await User.findOne({ email: manager.email });
    if (isExist) {
      return res.status(409).json({ message: "Email is already exist" });
    }
    const randomPassword = generateRandomPassword();

    let password = await generatePassword(randomPassword);

    await User.create({
      name: manager.name,
      email: manager.email,
      password: password,
      role: "manager",
      phone_number: manager.phone_number,
      verified: true,
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: manager.email,
      subject: "Activation Link",
      text: `Your email:${manager.email} and your password:${randomPassword} for signing in
                `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        return res.status(200).json({
          message:
            "Manager Created Successfully,Email and Password are send to Manager Email",
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.signin = async (req, res) => {
  try {
    const userData = req.body;
    const url = process.env.CLIENT_URL;
    if (!userData.password || !userData.email)
      return res.status(400).json({
        message: "role & email are required parameters for request",
      });
    const isExist = await User.findOne({ email: req.body.email });
    if (!isExist) {
      return res
        .status(409)
        .json({ message: "user with this Email is not exist" });
    }
    if (!isExist.verified) {
      return res
        .status(409)
        .json({ message: "user with this Email is not verified" });
    }
    bcrypt.compare(userData.password, isExist.password, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      if (result) {
        const token = GenerateToken(isExist);

        return res
          .status(201)
          .json({ message: "User Login successfully", token: token });
      } else {
        return res
          .status(400)
          .json({ message: "email or password is incorrect" });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.verfied = async (req, res) => {
  try {
    const token = req.params.token;

    jwt.verify(token, process.env.SECRET_KEY);
    const userData = jwt.decode(token);
    await User.updateOne({ email: userData.email }, { verified: true });
    return res.json({ message: "Verified successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.updateProfile = async (req, res) => {
  const profile = await User.findOne({ email: req.body.email });
  if (!profile) {
    return res
      .status(200)
      .json({ message: "user with this Email is not exist" });
  }
};

async function generatePassword(userEnteredPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(userEnteredPassword, salt);
}
