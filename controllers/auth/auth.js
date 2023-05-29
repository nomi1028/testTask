const User = require("../../model/User");
require("dotenv/config");
const GenerateToken = require("../../middleware/generteToken");
const transporter = require("../../middleware/sendmail");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    const UserData = req.body;
    const url = process.env.CLIENT_URL;
    if (!UserData.role || !UserData.password || !UserData.email)
      return res.status(400).json({
        msg: "role & email are required parameters for request",
      });
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
      return res.status(409).json({ msg: "Email is already exist" });
    }
    let password = await generatePassword(UserData.password);
    let profile = await User.create({
      name: UserData.name,
      email: UserData.email,
      password: password,
      role: UserData.role,
      phone_number: UserData.phone_number,
    });

    const token = GenerateToken(profile);
    return res
      .status(201)
      .json({ msg: "Account created successfully", token: token });
    // let mailOptions = {
    //   from: process.env.EMAIL,
    //   to: req.body.email,
    //   subject: "Activation Link",
    //   text: `
    //            please click on below link to activate your account \n
    //           ${url}/user/activate/${token} `,
    // };

    // transporter.sendMail(mailOptions, (error) => {
    //   if (error) {
    //     res.json({ message: error.message });
    //   } else {
    //     res
    //       .status(200)
    //       .json({ message: "Please check your email account and verify it" });
    //   }
    // });
    // } catch (error) {
    //   res.status(406).json({ message: error.message });
    // }
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.signin = async (req, res) => {
  try {
    const UserData = req.body;
    const url = process.env.CLIENT_URL;
    if (!UserData.password || !UserData.email)
      return res.status(400).json({
        msg: "role & email are required parameters for request",
      });
    const isExist = await User.findOne({ email: req.body.email });
    if (!isExist) {
      return res.status(409).json({ msg: "user with this Email is not exist" });
    }
    bcrypt.compare(UserData.password, isExist.password, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      if (result) {
        const token = GenerateToken(isExist);

        return res
          .status(201)
          .json({ msg: "User Login successfully", token: token });
      } else {
        return res.status(400).json({ msg: "email or password is incorrect" });
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
async function generatePassword(userEnteredPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(userEnteredPassword, salt);
}
