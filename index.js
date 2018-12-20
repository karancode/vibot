// index.js

const localConfig = require('./config');
const keyboards = require('./keyboards');
const bot_messages = require('./messages');

const email = require('./mail/sendmail');
const nodemailer = require('nodemailer');
var mail_config = require('./mail/mailconfig');


const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const winston = require('winston');
const toYAML = require('winston-console-formatter');
var request = require('request');


function createLogger() {
    const logger = new winston.Logger({
        level: "debug" // We recommend using the debug level for development
    });

    logger.add(winston.transports.Console, toYAML.config());
    return logger;
}

const logger = createLogger();

function say(response, message) {
    response.send(new TextMessage(message));
}

function on_option_kyboard(response){
    response.send(new TextMessage(bot_messages.ATTENDANCE_STATUS, keyboards.OPTION_KEYBOARD));
    //response.send(new KeyboardMessage(keyboards.OPTION_KEYBOARD));
}

function on_late_keyboard(response){
    response.send(new TextMessage(bot_messages.LATE_TIME, keyboards.LATE_KEYBOARD));
    //response.send(new KeyboardMessage(keyboards.LATE_KEYBOARD));
}

function on_dayoff_keyboard(response){
    response.send(new TextMessage(bot_messages.DAYOFF_REASON, keyboards.DAYOFF_KEYBOARD));
    //response.send(new KeyboardMessage(keyboards.DAYOFF_KEYBOARD));
}

function on_halfdayoff_keyboard(response){
    response.send(new TextMessage(bot_messages.HALFDAYOFF_REASON, keyboards.HALFDAYOFF_KEYBOARD));
    //response.send(new KeyboardMessage(keyboards.HALFDAYOFF_KEYBOARD));
}

function reason_keyboard(response){
    response.send(new TextMessage(bot_messages.RECORD_REASON, keyboards.REASON_KEYBOARD));
    //response.send(new KeyboardMessage(keyboards.REASON_KEYBOARD));
}

// function for sending email
function send_email(response){
    
    attendance_text = attendance_text + `\n\nThanks and Regards,\n${response.userProfile.name}\n\n --Sent via Vibot!`;
    
    let mail_options = {
        from : mail_config.SENDER_EMAIL,
        to : mail_config.RECEIVER_EMAIL,
        subject : `[Attendance]${response.userProfile.name}`,
        text : `${attendance_text}`
    };
    email.mailtransporter.sendMail(mail_options, function(error, info){
        if(error){
            console.log("error happened: " + error);
        }else{
            console.log("Email sent: " + info.response);
            response.send(new TextMessage("Noted. Thanks!"));
        }
    });
}

// Creating the bot with access token, name and avatar
const bot = new ViberBot(logger, {
    authToken: localConfig.viber_auth_token, // <--- Paste your token here
    name: "Vibot",  // <--- Your bot name here
    avatar: "http://api.adorable.io/avatar/108" // It is recommended to be 720x720, and no more than 100kb.
});

bot.onSubscribe(response => {
    say(response, `Hi there ${response.userProfile.name}.\n I am ${bot.name}! \n I am here to get your attendace details. \n Please send me 'Hi' anytime you want to record the attendance details! :)`);
});
let attendance_text = "\n=====================================\n Attendance Details/出席の詳細 \n=====================================\n";
let d = new Date();
let date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

bot.onTextMessage(/./, (message, response) => {
    switch(message.text) {
        case 'Hi':
            on_option_kyboard(response);
            attendance_text = attendance_text + `\n Date/日付 : ${date}`;
            break;
        case 'Late':
            on_late_keyboard(response); 
            attendance_text = attendance_text + "\n Arrival Status/到着ステータス : Late Arrival/遅れた到着";
            break;
        case '5to10min':
            reason_keyboard(response);
            attendance_text = attendance_text + "\n Late by/後で : 5-10 minutes/5〜10分";
            break;
        case '30min':
            reason_keyboard(response);
            attendance_text = attendance_text + "\n Late by/後で : 30 minutes/30分";
            break;
        case '1hr':
            reason_keyboard(response);
             attendance_text = attendance_text + "\n Late by/後で : 1 hour /1時間";
             break;
        case 'more1hr':
            reason_keyboard(response);
            attendance_text = attendance_text + "\n Late by/後で : More than 1 hour/1時間以上";
            break;    
        case 'DayOff':
            on_dayoff_keyboard(response);
            attendance_text = attendance_text + "\n Arrival Status/到着ステータス : Day Off/休みの日";
            break;
        case 'HalfDayOff':
            on_halfdayoff_keyboard(response);
            attendance_text = attendance_text + "\n Arrival Status : Half Day Off/半日休み";
            break;
        case 'amoff':
            reason_keyboard(response);
            attendance_text = attendance_text + "\n Off Period/オフ期間 : AM Off/AMオフ";
            break;
        case 'pmoff':
            reason_keyboard(response);
            attendance_text = attendance_text + "\n Off Period/オフ期間 : PM Off/PMオフ";
            break;
        case 'privatereason':
            attendance_text = attendance_text + "\n Reason/理由 : Private Reason/私的理由";
            send_email(response);
            break;
        case 'traindelay':
            attendance_text = attendance_text + "\n Reason/理由 : Train Delay/列車遅延";
            send_email(response);
            break;
        case 'badhealth':
            attendance_text = attendance_text + "\n Reason/理由 : Bad Health/健康状態が悪い";
            send_email(response);
            break;
        case 'trainingtrip':
            attendance_text = attendance_text + "\n Reason/理由 : Office Training/オフィストレーニング";
            send_email(response);
            break;
        default :
            response.send(new TextMessage("Sorry I do not understand. Please send \"Hi\" "));
    }
})

if (process.env.NOW_URL || process.env.HEROKU_URL) {
    const http = require('http');
    const port = process.env.PORT || 8080;

    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(process.env.NOW_URL || process.env.HEROKU_URL));
} else {
    logger.debug('Could not find the now.sh/Heroku environment variables. Please make sure you followed readme guide.');
}