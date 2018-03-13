const  jsdom = require('jsdom');
const htmlToText = require('html-to-text');
const {JSDOM} = jsdom;
const NEWS_URL = 'https://www.laval.ca/Pages/Fr/Nouvelles/nouvelles.aspx'

let news = [];
let MaxPageIndex = 0
let currentPage = 0

function load_news_from_page(pageUrl = NEWS_URL){
    return  JSDOM.fromURL(pageUrl).then(dom => {
        let scripts = dom.window.document.scripts;
        for(i = 0 ; i < scripts.length ; i++){
            let script = scripts[i].text.trim();
            if(script.indexOf('Laval.NewsArchive.initialize(') > 0 ){
                let fmt = script.split('Laval.NewsArchive.initialize(')[1].split(']}],')[0] + ']}]'; 
                console.log(fmt)
                fmt = JSON.parse(fmt);
                news = news.concat(fmt);
            }
        }
        
    });
}

function setup(){
    console.log(MaxPageIndex);
    return JSDOM.fromURL(NEWS_URL).then(dom => {
        let scripts = dom.window.document.scripts;
        for(i = 0 ; i < scripts.length ; i++){
            let script = scripts[i].text.trim();
            if(script.indexOf('Laval.NewsArchive.initialize(') > 0 ){
                if (!MaxPageIndex)  MaxPageIndex = script.split('Laval.NewsArchive.initialize(')[1].split('}]}],')[1].split(',')[0]; 
               console.log(MaxPageIndex);
            }
        }
    });
}


function loop_pages(){
    let promises =[]
       for( i = 1; i <= MaxPageIndex ; i++){
            let url = NEWS_URL  +  '?page=' + i
            console.log(url)
            let pm = load_news_from_page(url);
            promises.push(pm);
       }
    return Promise.all(promises);
}

module.exports = function(res){
  setup().then(function(){
     return  loop_pages();
  }).then(function(){
    res.send(news);
  })
    
}