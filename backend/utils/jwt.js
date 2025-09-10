//Buble
import dotenv from 'dotenv';
import jwtpkg from 'jsonwebtoken';
dotenv.config();


const {sign,verify} = jwtpkg;
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;


export const generateToken = (userId,username)=>{
    return sign(
        {userId,username},
          JWT_SECRET_KEY || "usPnV2sL0x5bsFWsbmoqMG",
        {expiresIn: JWT_EXPIRES_IN || 3600});
}


export const verifyToken=(token)=>{
    return verify(token, JWT_SECRET_KEY || "usPnV2sL0x5bsFWsbmoqMG");
}