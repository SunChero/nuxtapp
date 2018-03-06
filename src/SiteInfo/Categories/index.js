module.exports = function (script){
    let fmt  = script.split('Laval.CalendarSearch.RawClienteles = ')[1].split(';\n    Laval.CalendarSearch.RawCategories = ')[1].split(';\n    Laval.CalendarSearch.RawSubcategories = ')[0]
    return JSON.parse(fmt);
}