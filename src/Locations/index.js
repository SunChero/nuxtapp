const  jsdom = require('jsdom');
const {JSDOM} = jsdom;
const LIEUX_URL = 'https://www.laval.ca/lieux/Pages/Fr/accueil.aspx'
module.exports = function(res){
    
    let lieux;
    JSDOM.fromURL(LIEUX_URL).then(dom => {
        let scripts = dom.window.document.scripts;
        for(i = 0 ; i < scripts.length ; i++){
            let script = scripts[i].text.trim();
            if(script.indexOf('locationMapJson = [{') > 0 ){
                console.log('exists')
                let fmt = script.split('locationMapJson = ')[1].split(';\n        var delta_LocationMapJson = [{')[0];    
                return res.send(JSON.parse(fmt));
            }
            
        }
        return JSON.stringify([]);
    });

    // Promise.all([lieux]).then(function(){
    //     res.send(API);
    // }).catch(function(err) {console.error(err);})
}

