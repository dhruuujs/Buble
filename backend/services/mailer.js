import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config()

class Mailer{

    static async sendOtp(email){
        try{
        const otp = 5657;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS,
            },
        });


        const mailOptions={
            from: `Mail service demo <${process.env.EMAIL_USER}>`,
            to:email,
            subject:"Buble OTP - Welcome aboard",
            html:`
            <div style="height:100vh;width:100vw;background:#555;">
            <img src="cid:buble@gmail.com" alt="logo"/>
            <p style="height:100vh;width:100vw;color:#f2f2f2;>    
            Hi,<br/>
            Someone tried to sign up for a Buble account with ${email}.
            If it was you, enter this conformation code in the app:<br/>
            <h1>${otp}</h1>
            <br/>
            From Buble.
            </p>
            </div>`,
            attachment:[{
                filename:"buble.png",
                path:"../assets/buble.png",
                cid:"buble@gmail.com"
            }]
        }


        const info =  await transporter.sendMail(mailOptions);
        console.log("Email sent: ",info)
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    }
}

export default Mailer