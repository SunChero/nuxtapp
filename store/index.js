import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyBnPkJY7_Tmvyr9xNbZMgiAwwMk72LsQG4",
  authDomain: "laval2018-c3de0.firebaseapp.com",
  databaseURL: "https://laval2018-c3de0.firebaseio.com",
  projectId: "laval2018-c3de0",
  storageBucket: "laval2018-c3de0.appspot.com",
  messagingSenderId: "330106268919"
};

if(firebase.apps.length == 0 ) {
 // console.log('initializing apps')
  firebase.initializeApp(config);
  
}
const createStore = () => {
  return new Vuex.Store({
    state: {
      items: [],
      locations : 0,
      loading : false,
      db : null,
      orgs : [],
      events:[],
      info : {
        categories: [],
        subcategories : [],
        clients : [],
        tags : []
      }
    },
    mutations: {
      setLocations (state, payload) {
        state.loading = false;
        state.items  = payload;
      },
      setOrganizations(state , payload){
        state.loading = false;
        state.orgs  = payload;
      },
      setInfo(state,payload){
        state.loading = false;
        state.info  = payload;
      },
      setEvents(state,payload){
        state.loading = false;
        state.items  = payload;
      },
      setBroadcasts(state,payload){
        state.loading = false;
        state.items  = payload;
      },
      setNews(state,payload){
        state.loading = false;
        state.items  = payload;
      }
      
      
    },
    actions: {
      async fetchLocations (context, payload) {
        context.state.loading = true;
        let data = await axios('/_web/src/locations')
          .then( result => context.commit('setLocations' , result.data) );
        },
      async WWW_ASK_ORGS(context , payload){
        context.state.loading = true;
        let data = await axios('/_web/src/organizations')
          .then( result => context.commit('setOrganizations' , result.data) );
      },
      async WWW_ASK_INFO(context , payload){
        context.state.loading = true;
        let data = await axios('/_web/src/info')
          .then( result => context.commit('setInfo' , result.data) );
      },
      async WWW_ASK_EVENTS(context , payload){
        context.state.loading = true;
        let data = await axios('/_web/src/events')
          .then( result => context.commit('setEvents' , result.data) );
      },
      async WWW_ASK_NEWS(context , payload){
        context.state.loading = true;
        let data = await axios('/_web/src/news')
          .then( result => context.commit('setNews' , result.data) );
      },
      async WWW_ASK_BROADCASTS(context , payload){
        context.state.loading = true;
        let data = await axios('/_web/src/info/broadcast')
          .then( result => context.commit('setBroadcasts' , result.data) );
      },
      async DB_SAVE_ORGS(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.orgs.map((item)=>{
          db.ref(`/orgs/${item.Id}`).set(item);
        })
      },
      async DB_SAVE_CATEGORIES(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.info.categories.map((item)=>{
          db.ref(`/categories/${item.Id}`).set(item);
        })
      },
      async DB_SAVE_BROADCASTS(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.items.broadcasts.map((item)=>{
          console.log(item)
          db.ref('/broadcasts/').push(item);
        })
      },
      async DB_SAVE_NEWS(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.items.map((item)=>{
          console.log(item)
          db.ref('/news/').push(item);
        })
      },
      async DB_SAVE_DISCOVERIES(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.items.discoveries.map((item)=>{
          db.ref('/discoveries/').push(item);
        })
      },
      async DB_SAVE_SUBCATEGORIES(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.info.subcategories.map((item)=>{
          db.ref(`/subcategories/${item.Id}`).set(item);
        })
      },
      async DB_SAVE_CLIENTS(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.info.clients.map((item)=>{
          db.ref(`/clients/${item.Id}`).set(item);
        })
      },
      async DB_SAVE_TAGS(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.info.tags.map((item)=>{
          db.ref(`/tags/${item.Id}`).set(item);
        })
      },
      async DB_SAVE_EVENTS(context){
        let app = firebase.apps[0];
        let db = app.database();
        context.state.items.map((item)=>{
          db.ref(`events/${item.Id}_${format(item.EventDate)}`).set(item);
        })
      },
      async saveDb(context){
       // console.log('dispatching get DB');
        let app = firebase.apps[0];
        let db = app.database();
        //let locationRef = db.ref('/locations');
        context.state.items.map((item)=>{
            db.ref(`/locations/${item.LocationName.Id}`).set(item);
        })
       // let val = db.ref('/locations').set(context.state.items);
      }
    }
  })
}


function format(string){
  return  string.replace(/[^0-9.]/g, "");
}
export default createStore