import {verifyToken} from '../utils/jwt.js';
import Users from '../models/usermodel.js';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = async(req,res)=>{
    if(req.method=='OPTIONS'){
        return res.sendStatus(204);
    }

try{
const authHeader =req.headers.authorization;
const token = authHeader?.split('')[1];

if(!token){
    return res.status(400).json({error:`Authorization token required or token not found error:${token}`})
}
const decoded = verifyToken(token);
const userToken = await Users.findById(decoded.userId)

if(!userToken){
    return res.status(400).json({
        error: 'Invalid token user not found'
    })
}
req.user=userToken;
    }catch(err){
        console.log("Error at auth.js, Error: ",err)
    }
}