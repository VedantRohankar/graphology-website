export const getProfile = async(req,res)=>{
  res.status(200).json({
    message:"Welcome to profile!",
    userId:req.user.id,
  });
};
