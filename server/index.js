
const express = require('express')
const getEvents = require('../src/Events')
const getOrgs = require('../src/Organisations')
const getLocations = require('../src/Locations')
const getInfo = require('../src/SiteInfo')
const getBroadcasts = require('../src/SiteInfo/Broadcasts')

//const getDb = require('../src/db')

const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {

  app.use('/evts' , function(req, res){
    getEvents(res);
    
   });
  //  app.use('/db' , function(req, res){
  //   getDb(res);
    
  //  });
 app.use('/info' , function(req, res){
   getInfo(res);
  });
  app.use('/broadcast' , function(req, res){
    getInfo(res , true);
   });
  app.use('/orgs' , function(req, res){
    getOrgs(res);
   });

app.use('/loc' , function(req, res){
  getLocations(res)
});
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()




