<template>
  <main class="posts-page">
    <h1>All Posts</h1>
    <div v-if="errorFromStore">
     {{ errorFromStore }}
    </div>
    <ul v-if="postsFromStore.length">
      <li v-for="post in postsFromStore" :key="post.id">
        <h3 contenteditable >{{ post.title }}</h3>
        <p contenteditable >{{ post.body }}</p>
        <div class="container">
          <div class="row">
            <div class="col-1">
              <div>
                <i class="fa-regular fa-pen-to-square"></i>
              </div>
            </div>
            <div class="col-1">
              <div v-on:click="deletePost(post.id)">
                <i class="fa-solid fa-trash-can"></i>
              </div>
              
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>No Data Found</div>
  </main>
</template>

<script>
import posts from '../../data/db.json'
import axios from 'axios';
import store from '../store/index.js'

export default {
  data() {
    return {
      contentHeading: null,
      contentMessage: null,
    };
  },
  computed: {
    postsFromStore() {
       return this.$store.getters.getPosts;
    },
    errorFromStore(){
      return this.$store.getters.getErrors;
    }

  },
  mounted(){
    this.$store.dispatch('showAllPosts')
  },
  methods: {
      deletePost(index) { 
       this.$store.dispatch('removeItem', index)
      }
  }
};
</script>

<style>
.posts-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
}
ul {
  list-style: none;
  max-width: 90%;
  padding: 0;
}
ul li {
  border: 1px solid lightgray;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 5px;
}
li h3 {
  color: rgb(7, 57, 132);
  font-weight: 600;
}
li p {
  width: 90%;
  font-size: 16px;
}
li i{
  font-size: 14px;
}
</style>
