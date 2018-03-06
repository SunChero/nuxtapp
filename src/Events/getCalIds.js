//const htmlToText = require('html-to-text');
module.exports = function (script){
    let fmt = script.split('ActivityCalendarFilter')[1].split('RawActivityCalendarEntries = ')[1].split(';\n    Laval.')[0];
    fmt = JSON.parse(fmt);
    
    fmt = fmt.map(function(item){
        return item.ActivityPage.Id;
    });
 
    return  fmt;
}