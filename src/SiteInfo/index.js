// open main page and load  all values from this same page
const  jsdom = require('jsdom');
const {JSDOM} = jsdom;
const getbroadcasts =  require('./Broadcasts');
const getcategories = require('./Categories');
const getsubcategories = require('./SubCategories');
const getclients = require('./Clients');
const getdiscoveries =require ('./Discoveries');
const getAlerts =require('./Alerts');
const gettags =require('./Tags');

const CALENDAR_URL = 'https://www.laval.ca/Pages/Fr/Calendrier/recherche-activites.aspx'
const MAIN_URL = 'https://www.laval.ca/Pages/Fr/accueil.aspx'
let API = {};
function loadInfo(scripts){
    API = {};
    for(i = 0 ; i < scripts.length ; i++){
        let script = scripts[i].text.trim();
        if(script.indexOf('Laval.ActivityCalendarFilter.RawActivityCalendarEntries') == 0 ){
            API.categories = getcategories(script);
            API.subcategories = getsubcategories(script);
            API.clients = getclients(script);
            API.tags = gettags(script);
        }
    }
}
function loadMain(scripts){
    API = {};
    for(i = 0 ; i < scripts.length ; i++){
        let script = scripts[i].text.trim();
        if(script.indexOf('Laval.Broadcast.initialize') == 0 ){
            API.broadcasts ?  API.broadcasts = API.broadcasts.concat(getbroadcasts(script)) : API.broadcasts =  getbroadcasts(script);
        }
        if(script.indexOf('Laval.LavalDiscoveries.initialize') == 0 ){
            API.discoveries = getdiscoveries(script)
        }
        if(script.indexOf('Laval.MainNotices.initialize') == 0 ){
           // API.notices  ? API.notices  = API.notices.concat(getnotices(script)) : API.notices = getnotices(script);
        }
    }
}
module.exports =  function(res, main=false){
    let promises = [];
    if(!main){
        let info = JSDOM.fromURL(CALENDAR_URL).then(dom => {
            let scripts = dom.window.document.scripts;
            loadInfo(scripts);
        });
        promises.push(info);
    }
    if(main){
        let main = JSDOM.fromURL(MAIN_URL).then(dom => {
            let scripts = dom.window.document.scripts;
            loadMain(scripts);
        });
        promises.push(main);
    }
    
    Promise.all(promises).then(function(){
       res.send(API);
    }).catch(function(err) {console.error(err);})
}

