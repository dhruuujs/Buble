import Users from ''
import bcrypt from 'bcryptjs'
import {generateToken} from '../utils/jwt.js'



class AuthService{
//Signup Function
    static async signupUser(username,password,secondCred){
        
        
        if(!username){
            throw new Error("Username required");
        }

        if(!password){
            throw new Error("Password required");        
        }

        if(!secondCred){
            throw new Error("Email or phone number required");
               
        }


//Password to hashed
        const hashedPassword = await bcrypt.hash(password,12)

//Create users    
    const user = await Users.createAccount(
        username,
        hashedPassword,
        secondCred);

    const token = generateToken(user.user_id,user.username)
    //console.log(user)
    return {user,token}

}



//Login Function
static async loginUser(username,password){

   try{ 
    
    if(!username){
        throw new Error("Invalid username");
    }

    if(!password){
        throw new Error("Invalid password");
    }

    const user = await Users.findUserByUsername(username);
    if(!user){
        throw new Error("Username doesn't exist");
    }
    
    const isMatch = await bcrypt.compare(password,user.password_hash)
    if(!isMatch){
        throw new Error("Password doesn't match");
    }
    const token = generateToken(user.user_id,user.username);  
    const {password_hash:_,...userWithoutPassword} = user;
    
    return {user:userWithoutPassword,token}

}catch(err){
    return err.message
}

}

}
export default AuthService;