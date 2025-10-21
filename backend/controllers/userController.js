import Users from '../models/usermodel.js'

export const fetchUser = async (req,res)=>{
try{
    const {username}= await req.body;
    if(!username){
    return res.status(400).json({error:"Empty fields is not allowed"});    
    }
    const friendList = Users.findUserByUsername(username);
    return res.status(200).json({friends:friendList})
}catch(err){
    return new Error(err); 
}

} 