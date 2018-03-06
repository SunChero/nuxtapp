const  jsdom = require('jsdom');
const {JSDOM} = jsdom;
const getEvents = require('./getEvents')
const CALENDAR_URL = 'https://www.laval.ca/Pages/Fr/Calendrier/recherche-activites.aspx'
const Helpers =require('../Helpers')

module.exports = function(res){
        let events;
        JSDOM.fromURL(CALENDAR_URL).then(dom => {
            let script = Helpers.getCalScript(dom);
            getEvents(script, res);
        });   
}

