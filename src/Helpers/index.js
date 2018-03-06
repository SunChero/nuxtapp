const htmlToText = require('html-to-text');
const moment = require('moment');
module.exports.getCalScript = function(dom){
    let scripts = dom.window.document.scripts;
    for(i = 0 ; i < scripts.length ; i++){
        let script = scripts[i].text.trim();
        if(script.indexOf('Laval.ActivityCalendarFilter.RawActivityCalendarEntries') == 0 ){
            return script;
        }
    }
}
module.exports.getScript = function(dom){
    let scripts = dom.window.document.scripts;
    for(i = 0 ; i < scripts.length ; i++){
        let script = scripts[i].text.trim();
        if(script.indexOf('Laval.ActivityCalendarEntry.RawEntries') == 0 ){
            return script;
        }
    }
}
module.exports.getCost = function(dom){
    let cost = dom.window.document.getElementById('ctl00_PlaceHolderMain_ActivityCostRichHtmlField__ControlWrapper_RichHtmlField')
    
    if (cost) return htmlToText.fromString(cost.innerHTML);
    //cost.getElementsByTagName('p')[0].innerText
    
    return null;
}
module.exports.getLocation = function(dom){
    let location = dom.window.document.getElementById('ctl00_PlaceHolderMain_FreeTextLocationRichHtmlField__ControlWrapper_RichHtmlField')
    //console.log(location.innerText)
    //console.log(htmlToText.fromString(location.innerText));
    if(location) return  htmlToText.fromString(location.innerText);
    return undefined;
}
module.exports.getInformation = function(dom){
    let info = {}
    let email =  dom.window.document.getElementById('activity-information-content') 
    if(email) info.email = htmlToText.fromString(email.innerHTML)
    else info.email = null
    let phone =  dom.window.document.getElementById('ctl00_PlaceHolderMain_ActivityPhone')
    if(phone) info.phone =htmlToText.fromString( phone.innerHTML)
    else info.phone = null
    let site  =  dom.window.document.getElementById('ctl00_PlaceHolderMain_ActivityWebsite')
    if(site) info.site = htmlToText.fromString(site.innerHTML)
    else info.site = null
    //console.log(info)
    //if(info) return info.innerText
    return info;

}
module.exports.getSummary = function(dom){
    let summary = dom.window.document.getElementById('ctl00_PlaceHolderMain_ContentRichHtmlField__ControlWrapper_RichHtmlField')
    //console.log(summary.innerHTML)
    if (summary) return htmlToText.fromString(summary.innerHTML);
    //cost.getElementsByTagName('p')[0].innerText
    return null;
}

module.exports.formatDateSpan = function(startDate, endDate) {
    //console.log(moment(startDate) , moment(endDate))
    var strFromDate ='du';
    var strFromTime = 'a';
    var strToDate = 'au';
    var strToTime = 'a';
    var lcid = '';
    if (!startDate) {
        return "";
    }
  
    if (!endDate) {
        endDate = startDate;
    }
  
    if (moment(startDate).isSame(endDate, 'day')) {
        if (moment(startDate).format('HH:mm') === "00:00" && (moment(endDate).format('HH:mm') === "23:59" || moment(endDate).format('HH:mm') === "00:00")) {
            return moment(startDate).format(' LL ');
        }
        else if (moment(startDate).isSame(endDate, 'hour')) {
            if (moment(startDate).format('mm') === "00") {
                return moment(startDate).format(' LLL ');
            }
            else {
                return moment(startDate).format(' LLLL ');
            }
        }
        else {
            var formatedStartDate = moment(startDate).format('mm') === "00" ? moment(startDate).format(' l ') : moment(startDate).format(' LT ');
            var formatedEndDate = moment(endDate).format('mm') === "00" ? moment(endDate).format(' l ') : moment(endDate).format(' LT ');
            return moment(startDate).format('LL') + ", " + strFromTime + formatedStartDate + strToTime + formatedEndDate;
        }
    }
    else {
        if (moment(startDate).format('HH:mm') === "00:00" && moment(endDate).format('HH:mm') === "23:59" || moment(endDate).format('HH:mm') === "00:00") {
            return strFromDate + moment(startDate).format(' L') + (lcid == 1033 ? ", " : " ") + strToDate + moment(endDate).format(' L');
        }
        else {
            var formatedStartDate = moment(startDate).format('mm') === "00" ? moment(startDate).format('l') : moment(startDate).format('LT');
            var formatedEndDate = moment(endDate).format('mm') === "00" ? moment(endDate).format('l') : moment(endDate).format('LT');
            return strFromDate + moment(startDate).format(' L') + ", " + formatedStartDate + ", " + strToDate + moment(endDate).format(' L') + ", " + formatedEndDate;
        }
    }
  } 
  
module.exports.humanDate = function (start, end){
      let timestamp = val.replace(/[^0-9.]/g, "");
      let fulldate = moment(parseInt(timestamp)).format("YYYY-MM-DD");
      return fulldate;
}