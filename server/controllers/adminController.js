import { getAllUsers } from "../models/userModel.js";

export const getUsers = async(req,res)=>{
  try {
    
    const users= await getAllUsers();

    if(!users){
      return res.status(404).json({
        message:"Users Not Found",
      });
    }

    res.json(users);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"Server Error",
    });
    
  }

};