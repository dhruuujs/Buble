//Buble
import Users from '../models/usermodel.js'
import AuthService from '../services/authService.js'


//export const fetchUser=async(req,res)=>{try{
        //const {username} = await req.body
        //const rows = Users.findUserByUsername(username);
        //res.status(200).json({userData:rows[0]})}catch(err){}}


export const login = async(req,res)=>{
    try{
        const {username,password} = await req.body;
        console.log("Username",username,"\nPassword",password)
        
        if(!username){
            return res.status(401).json({error:"Username name is not valid"})
        }
        if(!password){
            return res.status(401).json({error:"Password is not valid"})
        }

        const rowUser = await Users.findUserByUsername(username);
        if(!rowUser){
            throw new Error("User not found!")
        }
        //console.log("This is user row",rowUser)
        const {user,token} = await AuthService.loginUser(username,password)  
      return res.status(200).json({user:user.username,token:token})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

export const signup = async(req,res)=>{
try{
 const {username,password,secondCred} = await req.body;
   
    if(!username){
            throw new Error("Username required");
        }
        if(!password){
            throw new Error("Password required");        
        }
        if(!secondCred){
            throw new Error("Email or phone number required");               
        }

    const existingUsr = await Users.findUserByUsername(username);
    if(existingUsr){
        return res.status(400).json({
            error:"User already exists"
        })
    }
    const {user,token} = await AuthService.signupUser(username,password,secondCred);
    if(!user){
        throw new Error("Failed to create user:",user)
    }
    if(!token){
        throw new Error("Failed to create token!\n")
    }

    return res.status(200).json({
        user:user,
        token:token
    })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


