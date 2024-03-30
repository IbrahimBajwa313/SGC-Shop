import nodemailer from 'nodemailer';
import User from "../models/userModel";
import bcryptjs from 'bcryptjs'; 
 
export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken ,
                verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken ,
                forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }


        // Configure mail transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        // Construct email details based on emailType
        const mailOptions = {
            from: '"Ibrahim Bajwa" <ibrahimbajwa1065@gmail.com>',
            to: email,
            subject: emailType === "verify" ? "Verify Your Email" : "Reset your password",
            text: 'This is a test email sent from Nodemailer in a Next.js API route!'
        };

        // Send mail with defined transport object
        const mailInfo = await transporter.sendMail(mailOptions);
        
        return mailInfo;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};


// import nodemailer from 'nodemailer';

// export const sendEmail = async ({email, emailType , userId}) => {
//     try {

//         // Todo
//         // Pending : Configure mail for usage

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'your-email@gmail.com',
//             pass: 'your-email-password'
//         }
//     });

//         // Send mail with defined transport object
//         const mailInfo = await transporter.sendMail({
//             from: '"Ibrahim Bajwa" <ibrahimbajwa1065@gmail.com>',
//             to: email ,
//             subject: emailType === "verify" ? "Verify Your Email" : "Reset your password" ,
//             text: 'This is a test email sent from Nodemailer in a Next.js API route!'
//         });

//         const mailRespose = transporter.sendMail(mailInfo)
//         return mailRespose;    
 
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// }
