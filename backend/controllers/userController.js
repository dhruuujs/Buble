import Users from '../models/usermodel.js'

export const fetchUser = async (req,res)=>{
try{
    const {username}= await req.body;
if(!username){
return res.status(400);    
}


}catch(err){

}



} 