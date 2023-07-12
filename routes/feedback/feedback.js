const express = require("express");

const router = express.Router();

const { addFeedback } = require("../../controllers/feedback/feedback");
const auth = require("../../middleware/checkauth");
router.route("/addfeedback").post(auth, addFeedback);

module.exports = router;
