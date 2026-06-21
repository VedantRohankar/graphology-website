import { getUserById } from "../models/userModel.js";

export const getProfile = async(req,res)=>{
 try {
  const user = await getUserById(req.user.id);

  if(!user){
    return res.status(404).json({
      message:"User not Found",
    });
  }

  res.json(user);

 } catch (error) {
  console.log(error);
  res.status(500).json({
    message:"Server Error",
  });
  
 }
};
