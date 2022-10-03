const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
  },
  razorpay: {
    orderId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
  },
});

const PaymentModel = mongoose.model("Payments", paymentSchema);
module.exports = PaymentModel;
