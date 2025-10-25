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
        return res.status(400).json({error:"Username required"})
        }
        if(!password){
        return res.status(400).json({error:"Password required"})
        }
        if(!secondCred){
            return res.status(400).json({error:"Email or phone number required"});               
        }

    const existingUsr = await Users.findUserByUsername(username);
    if(existingUsr){
        return res.status(401).json({
            error:"User already exists"
        })
    }
    const {user,token} = await AuthService.signupUser(username,password,secondCred);
    if(!user){
        return res.status(400).json({error:`Failed to create user: ${user}`})
    }
    if(!token){
        return res.status(400).json({error:"Failed to create token!"})
    }
    return res.status(200).json({
        user:user,
        token:token
    })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


