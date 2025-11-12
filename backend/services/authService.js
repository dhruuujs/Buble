import Users from '../models/usermodel.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../utils/jwt.js'


class AuthService{
//Signup Function
    static async signupUser(username,password,secondCred,){
    try{ 
    const userExist = await Users.findUserByUsername(username);
    if(userExist){
        return {error:"Username already in use"}; 
    }
    
    const hashedPassword = await bcrypt.hash(password,12)
    const user = await Users.createAccount(username,hashedPassword,secondCred);
    console.log("User ",user.username+" created.")    
    const token = generateToken(user.user_id,user.username)
    return {user:user.username,token}
        }catch(err){
            return {error:err.message}
        }
}


//Login Function
static async loginUser(username,password){
   try{ 
    if(!username){
        throw new Error("Username required");
    }
    if(!password){
        throw new Error("Password required");
    }

    const user = await Users.findUserByEmailAndUsername(username);
    if(!user){
        throw new Error("Username doesn't exist");
    }
    console.log("Password Boolean",user.password_hash);
    const isMatch = await bcrypt.compare(password,user.password_hash)
    if(!isMatch){
        throw new Error("Password doesn't match");
    }
    const token = generateToken(user.user_id,user);  
    const {password_hash:_,...userWithoutPassword} = user;
    
    return {user:userWithoutPassword,token}

}catch(err){
    throw new Error(err.message);
}

}

}
export default AuthService;