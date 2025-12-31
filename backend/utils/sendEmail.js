import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com', // Default to gmail if not set
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // 2) Define the email options
    const mailOptions = {
        from: `EyePPA <${process.env.SMTP_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;
