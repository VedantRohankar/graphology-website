import bcrypt from "bcrypt";
import { createUser,findUserEmail } from "../models/userModel.js";

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
      user,
     });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"Server Error",
    });
    
  }
};