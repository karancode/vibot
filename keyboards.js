module.exports = {

    OPTION_KEYBOARD: {
        "Type": "keyboard",
        "Revision": 1,
        "Buttons": [
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#52AA08",
                "Text": "Late",
                //TextVAlign, TextHAlign : using default (middle, center)
                "ActionType": "reply",
                "ActionBody": "Late"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#EE340B",
                "Text": "Day Off",
                "ActionType": "reply",
                "ActionBody": "DayOff"
            },
            {
                "Columns": 6,
                "Rows": 1,
                "BgColor": "#EE340B",
                "Text": "Day Off",
                "ActionType": "reply",
                "ActionBody": "HalfDayOff"
            }
        ]
    }

};