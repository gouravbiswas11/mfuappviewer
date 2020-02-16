import Vuex from 'vuex'
import Vue from 'vue'
//import Axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CFScomponents: [],
    RFScomponents:[]
  },
 

  getters : {
    CFScomponenets : state => {
      return state.CFScomponents;
    },
    RFScomponents : state => {
      return state.RFScomponents;
    },

  },
  mutations: {
    setCFScomponents : (state,payload) => {
      state.CFScomponents = payload
    },
    setRFScomponenets : (state,payload) => {
      state.RFScomponents= payload
    },
  },
  actions:{
   GET_CFS : async (context,payload) => {
   	let axiosConfig = {
      headers: {
          'Content-Type': 'application/XML',
          "Access-Control-Allow-Origin": "*",
      }
    };
   		if(payload.length==0){
      let { data } = await axios.get('http://172.17.2.104/SigmaCatalogServices/api/types(Customer_Facing_Service_Component)/entities',axiosConfig)
      context.commit('setCFScomponents',data.Entities.Component)
      console.log(data)
 		 }else{
 		 	context.commit('setCFScomponents',payload)
 		 }
   },
   GET_RFS : async (context,payload) => {
   	let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
   	if(payload.length==0){
      let { data } = await axios.get('http://172.17.2.104/SigmaCatalogServices/api/types(Resource_Facing_Service_Component)/entities',axiosConfig)
      context.commit('setRFScomponenets',data.Entities.Component)
  	}
  	else{
  		context.commit('setRFScomponenets',payload)
  	}
   }
 },
});