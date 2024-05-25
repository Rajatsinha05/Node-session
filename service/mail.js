
const nodemailer=require('nodemailer');


const sendMail=async(to,otp)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"rajatsinha5467@gmail.com",
            pass:"xdkvjjzfygksnfwk"
        }
    })

    const mailOptions={
       from:"rajatsinha5467@gmail.com" ,
       to:to,
       subject:"password reset",
       html:`<h1>otp :${otp}</h1>`

    }


   await transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(info);
        }
    })
}

module.exports=sendMail