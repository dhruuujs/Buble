//Buble
import Users from '../models/usermodel.js'
import AuthService from '../services/authService.js'


export const login =async(req,res)=>{
    try{
        const {username,password} = await req.body;
    

        if(!username){
            return res.status(401).json({error:"Username name is not valid"})
        }

        if(!password){
            return res.status(401).json({error:"Password is not valid"})
        }

        const rows = await Users.findUserByUsername(username);
        if(!rows){
            throw new Error("User not found!")
        }

        const {user,token} = await AuthService.loginUser(username,password)
    
      return res.status(200).json({user:user.username,token:token})
    }catch(err){
        return res.status(200).json({error:err.message})
    }
}

