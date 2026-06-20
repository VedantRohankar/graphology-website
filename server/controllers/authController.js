import bcrypt from "bcrypt";
import { createUser,findUserEmail } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
  try {
    const {username, email, password} = req.body;

    const existingUser = await findUserEmail(email);
    if(existingUser){
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await createUser(
      username,
      email,
      hashedPassword
    );
     res.status(200).json({
      message:"User Registered Successfully",
        user: {
        id: user.id,
        username: user.username,
        email: user.email,
        },
     });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"Server Error",
    });
    
  }
};

export const login = async(req,res)=>{

  try {
    const {email,password} = req.body;

    const user = await findUserEmail(email);

    if(!user){
      return res.status(400).json({
        message:"Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({
        message:"Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {id:user.id},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({
      message:"Login Successful",
      token,
      user:{
        id:user.id,
        username:user.username,
        email:user.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"Server Error",
    });
  }
};