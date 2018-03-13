
const express = require('express')
const getEvents = require('../src/Events')
const getOrganizations = require('../src/Organisations')
const getLocations = require('../src/Locations')
const getInfo = require('../src/SiteInfo')
const getNews = require('../src/News')
const getNewsPage = require('../src/News/page')
const getBroadcasts = require('../src/SiteInfo/Broadcasts')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
async function start() {
  app.use('/_web/src/events' , function(req, res){
    getEvents(res);
   });
  app.use('/_web/src/newsPage' , function(req, res){
        getNewsPage(req.query.link).then(function(result){
        res.send(result)
      })
  })
 app.use('/_web/src/info' , function(req, res){
   getInfo(res);
  });
  app.use('/_web/src/news' , function(req, res){
    getNews(res);
   });
  app.use('/_web/src/info/broadcast' , function(req, res){
    getInfo(res , true);
   });
  app.use('/_web/src/organizations' , function(req, res){
    getOrganizations(res);
   });

app.use('/_web/src/locations' , function(req, res){
  getLocations(res)
});
  const nuxt = new Nuxt(config)
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(nuxt.render)
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()




