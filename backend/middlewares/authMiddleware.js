import jwt from "jsonwebtoken";

export const protect=(req,res,next)=>{
   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
   if(!token){
      return res.status(401).json({message:"Not Authorized",success:false})
   }
   try {
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
      req.user={
         id: decoded.id,
         role: decoded.role,
      };
      next();
   } catch (error) {
     return res.status(401).json({ message: "Invalid token", success: false });
   }
}

export const adminOnly=(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
      return res.status(401).json({message:"Not Authorized",success:false})
   }
   try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.admin=decoded;

     if(req.admin.role === "admin"){  //  check role instead of email
   next();
      }
      else {
      return res.status(403).json({ message: "Admin only", success: false });
    }
   } catch (error) {
           res.status(401).json({ message: "Invalid token", success: false });
   }
}