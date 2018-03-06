const  jsdom = require('jsdom');
const htmlToText = require('html-to-text');
const {JSDOM} = jsdom;
const ORGANISME_URL = 'https://www.ville.laval.qc.ca/wlav3/maville/organismes.php'
const orgs = [];
let links = [];

function parseLinkPage(domLink){
    return JSDOM.fromURL(domLink).then(dom =>{
            getLinks(dom);
            nextPage = getNextPageLink(dom);
            if(nextPage){
               let tp =  parseLinkPage(nextPage);
               return Promise.all([tp]).then(()=> {return});
            }
            else{
                //return  links;
            }
    });
}
function getLinks(dom){
    let tmp =  dom.window.document.getElementsByTagName('td')
    for(i = 0 ; i < tmp.length ; i++)
         {
            let title = tmp[i].getElementsByTagName('a')[0].text
            let href = tmp[i].getElementsByTagName('a')[0].href
            links.push(href)
         }
        return;

}
function getNextPageLink(dom){
        let tmp =  dom.window.document.getElementsByClassName('search-pagination-pages')[0].children
        for(i = 0 ; i < tmp.length ; i++)
         {
             if(tmp[i].text == '>'){
                 return  tmp[i].href
             }
         }
         return false;
}
function getId(string){
    return string.split('?')[1].split('&')[0].split('=')[1]
}
module.exports = function(res){
    parseLinkPage(ORGANISME_URL).then(() =>{
        let tp = links.map((orgpage) => 
            {
                return JSDOM.fromURL(orgpage).then(
                (dom)=>{
                    let orgInfo = {};
                    orgInfo.Id = getId(orgpage);
                    orgInfo.title = dom.window.document.getElementById('org-title').innerHTML;
                    orgInfo.title = htmlToText.fromString(orgInfo.title)
                    orgInfo.addr = dom.window.document.getElementById('org-address').innerHTML;
                    orgInfo.addr = htmlToText.fromString(orgInfo.addr)
                    let info = dom.window.document.getElementsByClassName('file-item-info');
                    let cat = dom.window.document.getElementsByClassName('list-links');
                     let phone = dom.window.document.getElementsByClassName('phone-number')[0];
                     if(phone) orgInfo.phone = phone.innerHTML;
                     orgInfo.summary =  dom.window.document.getElementsByClassName('file-item-content')[1].getElementsByTagName('div')[0].innerHTML;
                     orgInfo.summary = htmlToText.fromString(orgInfo.summary)
                    for(i = 0 ; i< info.length ; i++)
                    {
                        let a = info[i].getElementsByTagName('a')[0];
                        if(a){
                                if(a.href.indexOf('@') > 0){
                                orgInfo.email = a.href;
                                }
                                if(a.href.indexOf('http') == 0){
                                orgInfo.site = a.href;
                                }
                        }
                    }
                    for(i = 0 ; i< cat.length ; i++)
                    {
                        let item = cat[i].getElementsByTagName('a');
                        for (i = 0 ; i < item.length ; i++){
                                if(item[i].href.indexOf('type') > 0){
                                    orgInfo.type = item[i].href.split('=')[1];
                                }
                                if(
                                    item[i].href.indexOf('secteur') > 0){
                                    orgInfo.secteur = item[i].href.split('=')[1];
                                }
                        }
                    
                    }
                    return orgs.push(orgInfo);
                    // console.log(` ${JSON.stringify(orgInfo)}`)
                    }
                )
            }
        );
        return Promise.all(tp).then(()=>{
            res.send(orgs);
        })
       
    })
    // return orgs.map((item)=>{
    //     return  JSDOM.fromURL(item).then((dom)=>{
    //             let info = dom.window.document.getElementsByClassName('file-item-info');
    //             return info;
    //     })
    // })

}