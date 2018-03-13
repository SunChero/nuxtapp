const  jsdom = require('jsdom');
const {JSDOM} = jsdom;
const htmlToText =require('html-to-text')
const BASE_URL = 'http://www.laval.ca'
module.exports = function(link ){
    let url = BASE_URL + link
    return  JSDOM.fromURL(url).then((dom) =>{
        let Info = {}
        Info.Title = dom.window.document.getElementsByClassName('page-title')[0].innerHTML;
        Info.Content = dom.window.document.getElementsByClassName('page-content')[0].innerHTML;
        Info.Source =dom.window.document.getElementById('news-source-content').innerHTML;
        Info.Image = dom.window.document.getElementById('ctl00_PlaceHolderMain_PageImage').src;
        Info.Title = htmlToText.fromString(Info.Title)
        Info.Content =  htmlToText.fromString(Info.Content)
        Info.Source =  htmlToText.fromString(Info.Source)
        return Info;
    })
}