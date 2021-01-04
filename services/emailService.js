const nodemailer = require('nodemailer');
async function sendMail({from,to,subject,text,html}) {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth:{
            user:process.env.MAIL_USER,

            pass:process.env.MAIL_PASS
        }
    });
    //TO SEND MAIL
    let info = await transporter.sendMail({
        from: `Ashare => ${from}`,
        to:to,
        subject:subject,
        text:text,
        html:html,
        //we are receiving all the values from the function

    })
    
}




module.exports = sendMail;
//all connected to files.js