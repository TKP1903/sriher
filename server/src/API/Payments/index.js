import express from "express";
import Razorpay from "razorpay";
import {v4 as uuid} from "uuid";
const crypto = require("crypto");

//Database Modal
import { EventModel } from "../../database/Events";
import { EventRegisterModel } from "../../database/Events/eventRegister";
import PaymentModel, { findByIdAndDelete } from "../../database/payments";
import sendMail from "../Email";

const Router = express.Router();

// const instance = new Razorpay({
//   key_id: "rzp_live_gN88e4C0ndRhfx",
//   key_secret: "V0fx6SYgRDzVPpm1sGnP5jZl",
// });
//localhost:4000/payment/order
http: Router.get("/getRZPKEY", async (req, res) => {
  try {
    return res.status(200).json({ key: "rzp_live_gN88e4C0ndRhfx" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_live_gN88e4C0ndRhfx",
      key_secret: "V0fx6SYgRDzVPpm1sGnP5jZl",
      // 			key_id: "rzp_live_gN88e4C0ndRhfx",
      //   key_secret: "V0fx6SYgRDzVPpm1sGnP5jZl",
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

Router.post("/verify/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const data = req.body;
    // console.log({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
    console.log(userID);
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "V0fx6SYgRDzVPpm1sGnP5jZl")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const event_id = await EventRegisterModel.find({
        user_id: userID,
      });
      // console.log({ eventReg });

      const eventReg = await EventRegisterModel.findOneAndUpdate(
        { _id: event_id },
        {
          $set: {
            paymentStatus: true,
          },
        }
      );
      console.log(eventReg);
      const pay = await PaymentModel.create({
        userId: userID,
        amount: eventReg.amount,
        date: Date.now(),
        razorpay: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        },
      });
      await sendMail(event_id);
      // console.log({ eventReg, pay });
      return res
        .status(200)
        .json({ message: "Payment verified successfully", data: data });
    } else {
      const data = await EventRegisterModel.findOneAndDelete({
        user_id: userID,
      });
      console.log({ data });
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

Router.get("/checkUserEventReg/:_id", async (req, res) => {
  try {
    const data = await EventRegisterModel.find({
      user_id: req.params._id,
    });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/get-all-payments", async (req, res) => {
  try {
    const data = await PaymentModel.find({}).populate({ path: "userId" });
    const payments = [];
    data.map((item) => {
      payments.push({
        name: item.userId.fullName,
        email: item.userId.email,
        phone: item.userId.phoneNumber[0],
        amount: item.amount,
      });
    });
    return res.status(200).json({ payments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default Router;




// Router.post("/new", async (req, res) => {
//     try {
//       // const  instance = new Razorpay({
//       //     key_id: process.env.RZR_PAY_ID,
//       //     key_secret: process.env.RZR_PAY_SECRET
//       // })
//       var options = {
//         amount: req.body.amount * 100,
//         currency: "INR",
//         receipt: `${uuid()}`,
//       };
//       const data = await instance.orders.create(options);
//       return res.json({ data });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  