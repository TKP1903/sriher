import express from "express";
import Razorpay from "razorpay";
import {v4 as uuid} from "uuid";
const crypto = require("crypto");

//Database Modal
import { EventModel } from "../../database/Events";
import { EventRegisterModel } from "../../database/Events/eventRegister";
import PaymentModel, { findByIdAndDelete } from "../../database/payments";
import sendMail, { EmailOTP } from "../Email";

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
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.post("/verify/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const data = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "V0fx6SYgRDzVPpm1sGnP5jZl")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const event_id = await EventRegisterModel.find({
        user_id: userID,
      });
      const eventReg = await EventRegisterModel.findOneAndUpdate(
        { _id: event_id },
        {
          $set: {
            paymentStatus: true,
          },
        }
      );
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
      const userData = event_id[0];
      const msg = {
        from: "oralpath@sriramachandra.edu.in",
        to: userData.user_email,
        subject: userData.eventName,
        html: `<strong>
          Hi,
        </strong><br />
        <strong>Thanks for registering ${userData.eventName}.</strong><br />
        <strong>Your payment was successfull.</strong><br />
        <strong>Hoping to see you on ${userData.event_start_data}</strong><br />
        <p>you have successfully registred for the event Clinico-Pathological Slide Seminar 2.0</p><br />
        <p>Thank you </p>
        `,
      };
      await EmailOTP(msg);
      // await sendMail();
      return res
        .status(200)
        .json({ message: "Payment verified successfully", data: data });
    } else {
      const data = await EventRegisterModel.findOneAndDelete({
        user_id: userID,
      });
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        paymentId: item.razorpay.paymentId,
      });
    });
    return res.status(200).json({ payments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.post("/pay", async (req, res) => {
  try {
    const pay = await PaymentModel.create({
      userId: "6331b17abb42dd700a3c5608",
      amount: 200,
      date: Date.now(),
      razorpay: {
        orderId: "6331b17abb42dd700a3c5608",
        paymentId: "6331b17abb42dd700a3c5608",
        signature: "6331b17abb42dd700a3c5608",
      },
    });
    return res.status(200).json({ pay });
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
  