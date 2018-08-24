//mail/sendmail.js

var nodemailer = require('nodemailer');

//var transporter = nodemailer.createTransport('smtps://grbseruczehfr2x4@ethereal.email:xxxxxx@smtp.ethereal.email');

var transporter = nodemailer.createTransport({
    service : 'smtp.ethereal.com',
    port : 465,
    secure : true,
    auth : {
        user : 'grbseruczehfr2x4@ethereal.email',
        pass : 'xxxxx'
    }
});

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'grbseruczehfr2x4@ethereal.email',
        pass: 'xxxxx'
    }
});

var mail_options = {
    from : 'grbseruczehfr2x4@ethereal.email',
    to : 'ktnewtemp@gmail.com',
    subject : 'Test Email from nodemailer - node.js',
    text : 'The email came means it worked!'
};

transporter.sendMail(mail_options, function(error, info){
    if(error){
        console.log("error happened: " + error);
    }else{
        console.log("Email sent: " + info.response);
    }
});