import express from "express";
import bcrypt from "bcryptjs";

//Models
import { UserModel } from "../../database/user/index";
import { EmailOTP } from "../Email";

const Router = express.Router();

/*
ROUTE       :   /signup
DESCRIPTION :   Register new user
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/signup", async (req, res) => {
  try {
    await UserModel.findUserByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({ token, status: "Signup success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /signin
DESCRIPTION :   login  user
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findUserByEmailAndPassword(
      req.body.credentials
    );
    const token = user.generateJwtToken();
    return res
      .status(200)
      .json({ userRole: user.userRole, token, status: "Signin success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route     /change-password
Des       change user password
Params    none
Access    Public
Method    POST
*/
Router.post("/change-password", async (req, res) => {
  try {
    const data = await req.body;
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(data.password, bcryptSalt);
    const updateData = {
      password: hashedPassword,
    };
    await UserModel.findOneAndUpdate(
      { _id: data._id },
      {
        $set: {
          password: updateData.password,
        },
      }
    );
    return res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route     /change-password-by-email
Des       change user password using email
Params    none
Access    Public
Method    POST
*/
Router.post("/change-password-by-email", async (req, res) => {
  try {
    const data = await req.body;
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(data.password, bcryptSalt);
    const updateData = {
      password: hashedPassword,
    };
    const user_id = await UserModel.findOne({ email: data.email });
    await UserModel.findOneAndUpdate(
      { _id: user_id._id },
      {
        $set: {
          password: updateData.password,
        },
      }
    );
    return res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     /verify-email
Des       check user email and send otp
Params    none
Access    Public
Method    GET
*/
Router.get("/verify-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await UserModel.findOne({
      email,
    });
    console.log({ data });
    if (!data) {
      throw new Error("Email doesnt exist");
    }
    const otp = Math.floor(Math.random() * 10000 + 1).toString();
    const user_data = await UserModel.findOne({ email });
    if (!user_data) {
      throw Error("Email doesnot exist");
    }
    const us = await UserModel.findOneAndUpdate(
      { _id: user_data._id },
      {
        $set: { otp: otp },
      }
    );
    const msg = {
      from: "oralpath@sriramachandra.edu.in",
      to: data.email,
      subject: "Oralpath",
      html: `<strong>
        </strong><br />
        <strong>Your OTP to reset the password for SRIHER Oralpath department website is ${otp}</strong><br />
        `,
    };
    await EmailOTP(msg);
    return res.status(200).json({ message: "OTP Sent" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     /verify-otp
Des       Verify the otp
Params    none
Access    Public
Method    POST  
*/
Router.post("/verify-otp", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if (user.otp === parseInt(req.body.otp)) {
    } else {
      throw new Error("Invalid otp");
    }
    if (user.otp != req.body.otp) {
      throw Error("Invalid OTP");
    }
    // res.status(200).json({ message: "Email sent Successfully" });
    res.status(200).json({ message: "Verified successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
  
export default Router;