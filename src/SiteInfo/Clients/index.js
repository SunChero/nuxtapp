module.exports = function (script){
    let fmt = script.split('Laval.CalendarSearch.RawClienteles = ')[1].split(';\n    Laval.CalendarSearch.RawCategories = ')[0];
     return JSON.parse(fmt);
}