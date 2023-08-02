  
  import { NextRequest } from "next/server";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import User from "@/models/userModel";
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d121c66fbc1481",
      pass: process.env.MAILTRAP_PASSWORD
    }
  });
   // mailer.ts is used to send email to a users email address for verification purpose

  //it will create a token and then send that token to the user's email

  export default async function sendEmail({email,userId,emailType}:any){
    //create the token to be sent, use bcrypt.js
    try {
   const salt=await bcryptjs.genSalt(10)  
   const verificationToken= await bcryptjs.hash(userId.toString(),salt);
   
   const info = await transporter.sendMail({
    from: "NEXTJS@gmail.com", // sender address
    to: email, // list of receivers
    subject: "verfy your account", // Subject line
    text: "to verify, copy link to your browser ", // plain text body
    html: `<p >${process.env.DOMAIN}/verify?token=${verificationToken}</p>`, // html body
  });
   if(emailType==="verifyUser"){
  await  User.findByIdAndUpdate(userId,{
      verifyToken:verificationToken,
      verifyTokenExpiry:Date.now()+1000*60*10
      
    })
    if(emailType==="forgotPassword")
    {
      await  User.findByIdAndUpdate(userId,{
        forgotPasswordToken:verificationToken,
       forgotPasswordTokenExpiry:Date.now()+1000*60*10
  
      })
    }
   }
    

                 
    } catch (error:any) {
        console.log(error.message,"message not sent");
          
    }
  }
  