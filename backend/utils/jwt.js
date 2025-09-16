//Buble
import dotenv from 'dotenv';
import jwtpkg from 'jsonwebtoken';
dotenv.config();

const {sign,verify} = jwtpkg;
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;


export const generateToken = (userId,user)=>{
    return sign(
        {userId,user},
        JWT_SECRET_KEY || "usPnV2sL0x5bsFWsbmoqMG",
        {expiresIn: JWT_EXPIRES_IN}
    );
}

export const verifyToken = (token)=>{
  try{
return verify(token, JWT_SECRET_KEY || "usPnV2sL0x5bsFWsbmoqMG");
  }catch(err){
    return err;
  }
}