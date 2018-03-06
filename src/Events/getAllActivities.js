
module.exports = function (script){
    let fmt = script.split('Laval.ActivityFilter.RawActivityPages = ')[1].split(';\n    Laval.ActivityFilter.RawActivityPages_Delta = ')[0];
    fmt = JSON.parse(fmt);
   
    return  fmt;
}