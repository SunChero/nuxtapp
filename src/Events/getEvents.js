const  jsdom = require('jsdom');
const {JSDOM} = jsdom;
const getActivities = require('./getActivities')
const PAGE_URL = 'https://www.laval.ca'
const Helpers =require('../Helpers')

module.exports = function(script,res){
    let Evts = [];
    let promises =[];
    let activities = getActivities(script);
    //activities = activities.slice(0 , 2);
    activities.map((activity) =>{
        let url = PAGE_URL + activity.activity.ServerRelativeUrl;
        let prom = JSDOM.fromURL(url).then((dom) =>{
            let script = Helpers.getScript(dom);
            let fmt = script.split('Laval.ActivityCalendarEntry.RawEntries = ')[1].split(';\n\n    Laval.ActivityCalendarEntry.initialize()')[0];
            fmt = JSON.parse(fmt);
            let extra = loadExtraInfo(fmt , dom);
            let _events = AttachActivity(extra, activity)
            //console.log(_events)
            _events.map(ev =>{
                Evts.push(ev)
            });
            //console.log(Evts)
        })
        //console.log(Evts)
        promises.push(prom);
        
    });
    Promise.all(promises).then(() => {
        return res.send(Evts);
    })
}

function AttachActivity(cals , activity){
    return cals.map((cal)=> {
        cal.activity = activity.activity;
        return cal;
    })
}
function loadExtraInfo(cals ,dom){
   return  cals.map(cal => {
        cal._summary = Helpers.getSummary(dom)
        cal._info =  Helpers.getInformation(dom)
        cal._cost =  Helpers.getCost(dom)
        cal._time =  Helpers.formatDateSpan(cal.EventDate , cal.EndDate) 
        return cal;
    })

}