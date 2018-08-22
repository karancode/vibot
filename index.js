// index.js

const localConfig = require('./config');
const keyboards = require('./keyboards');

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
    response.send(new KeyboardMessage(keyboards.OPTION_KEYBOARD));
}

function on_late_keyboard(response){
    response.send(new KeyboardMessage(keyboards.LATE_KEYBOARD));
}

function on_dayoff_keyboard(response){
    response.send(new KeyboardMessage(keyboards.DAYOFF_KEYBOARD));
}

function on_halfdayoff_keyboard(response){
    response.send(new KeyboardMessage(keyboards.HALFDAYOFF_KEYBOARD));
}

function reason_keyboard(response){
    response.send(new KeyboardMessage(keyboards.REASON_KEYBOARD));
}


// Creating the bot with access token, name and avatar
const bot = new ViberBot(logger, {
    authToken: localConfig.viber_auth_token, // <--- Paste your token here
    name: "Vibot",  // <--- Your bot name here
    avatar: "http://api.adorable.io/avatar/108" // It is recommended to be 720x720, and no more than 100kb.
});

bot.onSubscribe(response => {
    say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me if a web site is down for everyone or just you.\
     Just send me a name of a website and I'll do the rest!`);
});

bot.onTextMessage(/./, (message, response) => {
    switch(message.text) {
        case 'Hi':
            on_option_kyboard(response);
            break;
        case 'Late':
            on_late_keyboard(response); 
            break;
        case '5to10min':
        case '30min':
        case '1hr':
        case 'more1hr':
            reason_keyboard(response);
            break;    
        case 'DayOff':
            on_dayoff_keyboard(response);
            break;
        case 'HalfDayOff':
            on_halfdayoff_keyboard(response);
            break;
        case 'amoff':
        case 'pmoff':
            reason_keyboard(response);
            break;
        case 'privatereason':
        case 'traindelay':
        case 'badhealth':
        case 'trainingtrip':
            response.send(new TextMessage("Noted. Thanks!"));
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