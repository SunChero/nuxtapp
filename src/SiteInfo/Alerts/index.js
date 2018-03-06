
module.exports = function (script){
    let fmt = '[' + script.split('([').pop().split('"}]}],')[0] + '"}]}]';
           // state.notices = state.notices.concat(JSON.parse(fmt));
            fmt = JSON.parse(fmt);
            fmt = fmt.map(function(notice){
              notice.WarningInfos =  notice.WarningInfos.map(function(info){
                 // info.Created = fixDate(info.Created);
                  return info;
              });
              return notice;
            });
            fmt = fmt.filter(function(valid){
                return valid.WarningInfos.length > 0
            });
    return fmt;
}