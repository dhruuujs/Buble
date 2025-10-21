import {verifyToken} from '../utils/jwt.js';
import Users from '../models/usermodel.js';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = async(req,res,next)=>{
    if(req.method=='OPTIONS'){
        return res.sendStatus(204);
    }
try{
const authHeader =req.headers.authorization;
const token = authHeader?.split(' ')[1];

if(!token){
    return res.status(400).json({error:`Authorization token required or token not found error:${token}`})
}

const decoded = verifyToken(token);
//console.log("Decoded token from auth.js", decoded);

if (!decoded || decoded.name === 'TokenExpiredError') {
    return res.status(401).json({
        error: decoded.name === 'TokenExpiredError' ? "Token Expired" : "Unable to decode user data!"
    });
}
const userToken = await Users.findUserById(decoded.userId)
if(!userToken){
    return res.status(400).json({
        error: 'Invalid token, user not found'
    })
}
req.user=userToken;
next();
    }catch(err){
        res.status(500).json({error:err.message});
        console.log("Error at auth.js, Error: ",err.message)
    }
}