//mail/sendmail.js

var nodemailer = require('nodemailer');
var mail_config = require('./mailconfig');


var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : mail_config.AUTH_EMAIL,
        pass : mail_config.AUTH_EMAIL_PASSWORD
    }
});
/*var mail_options = {
    from : mail_config.SENDER_EMAIL,
    to : mail_config.RECEIVER_EMAIL,
    subject : `[Attendance]`,
    text : 'The email came means it worked!'
};*/

/*transporter.sendMail(mail_options, function(error, info){
    if(error){
        console.log("error happened: " + error);
    }else{
        console.log("Email sent: " + info.response);
    }
});*/

exports.mailtransporter = transporter;
//exports.mailoptions = mail_options;
