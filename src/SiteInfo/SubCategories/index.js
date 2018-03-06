module.exports = function (script){
    let fmt  = script.split('Laval.CalendarSearch.RawSubcategories = ')[1].split(';\n    Laval.CalendarSearch.RawTags = ')[0]
    return JSON.parse(fmt);
}