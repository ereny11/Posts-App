// import { Vue } from 'vue'
// import Vuex from "vuex";
import axios from "axios";
import { createStore } from "vuex";
import posts from '../../data/db.json'


export default createStore({
    state:{
        allPosts: [], 
        error: null
    },
    getters:{
        getPosts(state){
            return state.allPosts
        },
        getErrors(state){
            return state.error
        }
    },
    actions: {
        async showAllPosts(){
            try{
                const resp = await axios.get("./../data/db.json")
                console.log("🚀 ~ showAllPosts ~ resp:", resp)
                this.state.allPosts = resp.data.posts 
            }catch(e){
                console.log("🚀 ~ showAllPosts ~ e:", e)
                this.state.error = "Problem has occured, please try again!"
            }
        },
        removeItem(context, payload) {
            this.state.allPosts =  this.state.allPosts.filter( post => post.id != payload); 
        }
      }
});