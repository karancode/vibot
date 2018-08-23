module.exports = {

    OPTION_KEYBOARD: {
        "Type": "keyboard",
        "Revision": 1,
        "Buttons": [
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Late",
                //TextVAlign, TextHAlign : using default (middle, center)
                "ActionType": "reply",
                "ActionBody": "Late"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Day Off",
                "ActionType": "reply",
                "ActionBody": "DayOff"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Half Day Off",
                "ActionType": "reply",
                "ActionBody": "HalfDayOff"
            }
        ]
    },

    LATE_KEYBOARD: {
        "Type": "keyboard",
        "Revision": 1,
        "Buttons": [
            {
                "Columns": 3,
                "Rows": 2,
                "BgColor": "#2db9b9",
                "Text": "5-10 Minutes",
                //TextVAlign, TextHAlign : using default (middle, center)
                "ActionType": "reply",
                "ActionBody": "5to10min"
            },
            {
                "Columns": 3,
                "Rows": 2,
                "BgColor": "#2db9b9",
                "Text": "30 Minutes",
                "ActionType": "reply",
                "ActionBody": "30min"
            },
            {
                "Columns": 3,
                "Rows": 2,
                "BgColor": "#2db9b9",
                "Text": "1 Hour",
                "ActionType": "reply",
                "ActionBody": "1hr"
            },
            {
                "Columns": 3,
                "Rows": 2,
                "BgColor": "#2db9b9",
                "Text": "> 1 Hour",
                "ActionType": "reply",
                "ActionBody": "more1hr"
            }
        ]
    },
    DAYOFF_KEYBOARD : {
        "Type": "keyboard",
        "Revision": 1,
        "Buttons": [
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Bad Health",
                "ActionType": "reply",
                "ActionBody": "badhealth"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Training / Business Trip",
                "ActionType": "reply",
                "ActionBody": "trainingtrip"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Private",
                "ActionType": "reply",
                "ActionBody": "privatereason"
            }
        ]
    },
    HALFDAYOFF_KEYBOARD : {
        "Type": "keyboard",
        "Revision": 1,
        "Buttons": [
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "AM Off",
                //TextVAlign, TextHAlign : using default (middle, center)
                "ActionType": "reply",
                "ActionBody": "amoff"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "PM Off",
                "ActionType": "reply",
                "ActionBody": "pmoff"
            },
        ]
    },
    REASON_KEYBOARD : {
        "Type": "keyboard",
        "Revision": 1,
        "Buttons": [
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Train Delay",
                //TextVAlign, TextHAlign : using default (middle, center)
                "ActionType": "reply",
                "ActionBody": "traindelay"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Bad Health",
                "ActionType": "reply",
                "ActionBody": "badhealth"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Private",
                "ActionType": "reply",
                "ActionBody": "privatereason"
            },
            /*{
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#2db9b9",
                "Text": "Other",
                "ActionType": "reply",
                "ActionBody": "Please send your late reason!"
            },*/
        ]
    }
};