import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  feedback_event_id: { type: String, ref: "eventsFeedback" },
  user_id: { type: String, ref: "Users" },
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: Number },
  faculty1_rating: { type: Number },
  faculty2_rating: { type: Number },
  faculty3_rating: { type: Number },
  faculty4_rating: { type: Number },
  event_rating: { type: Number },
  topicRating: { type: Number },
  path_to_event: { type: String },
  suggested_topic: { type: String },
  suggestion: { type: String },
  status: { type: String },
});

export const FeedbackModel = mongoose.model("feedback", FeedbackSchema);