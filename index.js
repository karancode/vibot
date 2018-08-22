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

/*function on_dayoff_keyboard(response){
    //response.send(new KeyboardEvent(keyboards.DAYOFF_KEYBOARD));
    //ask reason directly
    response.send(new KeyboardMessage(keyboards.REASON_KEYBOARD));
}*/

function on_halfdayoff_keyboard(response){
    response.send(new KeyboardEvent(keyboards.HALFDAYOFF_KEYBOARD));
}

function reason_keyboard(response){
    response.send(new KeyboardEvent(keyboards.REASON_KEYBOARD));
    response.send(new TextMessage("Noted. Thanks! :) "));
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
    if (message.text === 'Hi'){
        on_option_kyboard(response);
    }else if (message.text === 'Late'){
        // late details
        on_late_keyboard(response); 
    }else if (message.text === 'DayOff'){
        // day off details
        //on_dayoff_keyboard(response);
        reason_keyboard(response);
    }else if (message.text === 'HalfDayOff'){
        // half day off details
        on_halfdayoff_keyboard(response);
    }else if(message.text === 'amoff'){
        reason_keyboard(response);
    }else if(message.text === 'pmoff'){
        reason_keyboard(response);
    }else{
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