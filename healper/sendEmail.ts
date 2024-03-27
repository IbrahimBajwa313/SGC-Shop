import nodemailer from 'nodemailer';

export const sendEmail = async ({email, emailType , userId}) => {
    try {

        // Pending : Configure mail for usage
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

        // Send mail with defined transport object
        const mailInfo = await transporter.sendMail({
            from: '"Ibrahim Bajwa" <ibrahimbajwa1065@gmail.com>',
            to: email ,
            subject: emailType === "verify" ? "Verify Your Email" : "Reset your password" ,
            text: 'This is a test email sent from Nodemailer in a Next.js API route!'
        });

        const mailRespose = transporter.sendMail(mailInfo)
        return mailRespose;    
 
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
