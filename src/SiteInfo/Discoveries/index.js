const htmlToText = require('html-to-text');

module.exports = function (script){
            let fmt = '[' + script.split('[').pop().split(']')[0] + ']';
            fmt = JSON.parse(fmt);
            fmt = fmt.map(function(item){
             // item.Title = htmlToText.fromString(item.Title);
              //item.Summary = htmlToText.fromString(item.Summary);
              
              return item;
            });
    return fmt;
}