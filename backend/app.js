import express,{urlencoded} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import login from '../backend/routes/authRoutes.js'
import signup from '../backend/routes/authRoutes.js'
import auth from '../backend/routes/authRoutes.js'


const app=express();
dotenv.config();

//Configs
app.use(cors({
    orgin:"*",
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
}catch(err){
  console.log(err);
}

app.get("/",(req,res)=>{
res.status(200).send(`Server up and listening on port 5000, nigga`)
})


export default app;
