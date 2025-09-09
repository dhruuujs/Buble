import express,{} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';


const app=express();
dotenv.config();

//Configs
app.use(cors({
    orgin:"http://localhost:5173",
    optionsSuccessStatus:200
    }))
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//Routers
try{
app.use("/account",login);
app.use("/account",signup);
app.use("/account",auth);
app.use("/account",showFriendList)

app.use("/chats")


}catch(err){
  console.log(err);
}


app.get("/",(req,res)=>{
res.status(200).send(`Server up and listening on port ${PORT}, nigg`)
})

console.log("Server Dispur running.")
app.listen(5000,()=>console.log(`Server listening on: ${PORT}`))