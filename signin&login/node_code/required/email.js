const nodemailer = require('nodemailer')

exports.sendMail = async (mail, password, name, userId) => {


    const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: "sariha9601@gmail.com", // sender username
            pass: "edabmlsjuwdxwqky" // sender's hidden password
        }
    });

    const mailOption = {

        from: "sariha9601@gmail.com",
        to: mail,
        subject: "Sending your temporary password",
        text: `Hi ${name}, This is your userId ${userId} and temporary password ${password}. Login with these details and then reset your password `
    };

    return transporter.sendMail(mailOption)
}