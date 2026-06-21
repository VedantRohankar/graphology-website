import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{

  try {
    //Get token from authorized header.
    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res.status(401).json({
        message:"Access Denied. No Token Provided",
      });
    }
  //Token format:Bearer <token>
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

  //Store user data in request
  req.user = {
    id:decoded.id,
    role:decoded.role,
  };

  next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      message:"Invalid or Expired Token",
    });
    
  }
}