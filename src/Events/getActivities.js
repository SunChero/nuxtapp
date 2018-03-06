const getCalIds = require('./getCalIds');
const getAllActivities = require('./getAllActivities')
/**
 * 
 * model activity{ id: calendarId, activitiy: activity}
 */
module.exports = function(script){
    calIds = getCalIds(script);
    activities = getAllActivities(script);
    
    let Calendars =  calIds.map((calid)=>{
                cal = {};
                cal.id = calid;
                cal.activity = activities.filter((act)=>{
                    if(act.Id == calid) {
                        return act;
                    }
                })
                if(cal.activity.length > 0){
                    cal.activity = cal.activity[0];
                }
                return cal;
                
        });
       
    Calendars =  Calendars.filter((item)=>{
       if(item.activity.Locations !== undefined){
           if(item.activity.Locations.length > 0){
               return item;
           }
       }
    });
    console.log(Calendars.length)
    return Calendars;
}