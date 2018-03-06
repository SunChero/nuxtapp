module.exports = function (script){
    let fmt = script.split('Laval.CalendarSearch.RawTags = ')[1].split(';\n    Laval.CalendarSearch.MaxNbResults = ')[0];
     return JSON.parse(fmt);
}