import express from "express";
import passport from "passport";

//Dadabase model
//import { UserModel } from "../../database/user/index";
import { UserModel } from "../../database/user/index"

const Router = express.Router();

/*
Route     /:_id
Des       Get user data based on _id
Params    _id
BODY      none
Access    Public
Method    GET  
*/
Router.get("/", passport.authenticate("jwt"), async (req, res) => {
  try {
    const user = req.session.passport.user;
    // const { password, user } = data;
    // console.log(user);
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /add-user
DESCRIPTION :   add a new user
PARAMS      :   NO
ACCESS      :   Public
METHOD      :   POST
*/

Router.post("/add-user", async (req, res) => {
  try {
    const data = await req.body.userData;
    const user = await UserModel.create(data);
    res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     /update
Des       update user Data
Params    _id
BODY      user data
Access    Public
Method    PUT  
*/
Router.put("/update", async (req, res) => {
  try {
    const data = req.body.userData;
    console.log("updateddddddddddddddddddddddddddddddd");
    console.log(data);
    const user = await UserModel.findOneAndUpdate(
      { _id: data._id },
      { $set: data }
    );
    console.log(user);
    return res
      .status(200)
      .json({ message: "user profile updated successfully", data: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route     /
Des       Get all user
Params    _id
BODY      none
Access    Public
Method    GET  
*/
Router.get("/allusers", async (req, res) => {
  try {
    const user = await UserModel.find();
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
ROUTE       :   /delete
DESCRIPTION :   delete user based on id
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   DELETE
*/
Router.delete("/delete/:_id", async (req, res) => {
  try {        
      const _id = req.params;
      const isAvailable = await UserModel.findOne({_id});
      if(!isAvailable) {
          throw Error("User Not exist");
      }
      const data = await UserModel.findByIdAndDelete(_id);
      res.status(200).json({data: data, message: "User Deleted successfully"});
  } catch (error) {
      res.status(500).json({error: error.message});
  }
});



/*
ROUTE       :   /search-user
DESCRIPTION :   search users from db using email
PARAMS      :   _id
ACCESS      :   Public
METHOD      :   GET
*/
Router.get("/search-user/:key", async (req, res) => {
  try {        
    const key = req.params.key;
    const data = await UserModel.find({
      email: {$regex: key, $options: "i"}
      });
      res.status(200).json({data});
  } catch (error) {
      res.status(500).json({error: error.message});
  }
});
export default Router;
