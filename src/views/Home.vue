<template>
  <main class="posts-page">
    <h1>All Posts</h1>
    <div v-if="error">
     {{ error }}
    </div>
    <ul v-if="allPosts.length">
      <li v-for="post in allPosts" :key="post.id">
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
    <div v-else>Loading...</div>
  </main>
</template>

<script>

export default {
  data() {
    return {
      allPosts: [],
      error: null,
      contentHeading: null,
      contentMessage: null,
    };
  },
  mounted() {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => (this.allPosts = data))
      .catch((err) => {
        this.error = "No Data Available"
        console.log(err.message)
      });
  },
  methods: {
      deletePost(index) {
        const all = this.allPosts.filter( post => post.id != index); 
        this.allPosts = all
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
