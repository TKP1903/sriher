const express = require("express");
const { FeedbackModel } = require("../../database/Feedback");

const Router = express.Router();

Router.get("/get-user-certificates/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    console.log({ user_id });
    const certificates_data = await FeedbackModel.find({
      user_id,
    }).populate("feedback_event_id");
    console.log({ certificates_data });
    return res.status(200).json({ data: certificates_data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});
module.exports = Router;
