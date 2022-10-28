import mongoose from "mongoose";

const FacultyFeedbackSchema = new mongoose.Schema({
  name: { type: String },
  faculty1: { type: String },
  faculty2: { type: String },
  faculty3: { type: String },
  faculty4: { type: String },
  image: [{ type: String }],
  feedback_status: { type: String },
});


export const EventsFeedbackModel = mongoose.model("eventsFeedback", FacultyFeedbackSchema);