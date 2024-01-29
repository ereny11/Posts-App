<template>
  <main class="posts-page">
    <h1>All Posts</h1>
    <div v-if="errorFromStore">
     {{ errorFromStore }}
    </div>
    <ul v-if="postsFromStore.length">
      <li v-for="post in postsFromStore" :key="post.id">
        <h3 >{{ post.title }}</h3>
        <div v-for="field in fields" :key="post.id" class="editable-field">
          <div class="editing" v-if="editedFieldId === post.id">
            <textarea type="text" v-model="post.body" :ref="`field${post.id}`"  class="form-control editable-input"></textarea>
            <button class="save-btn btn" @click.prevent="toggleEdit">
              <div>Save</div>
            </button>
          </div>
          <div v-else>
            <p >{{ post.body }}</p>
          </div>
        </div>

        <div class="container" v-if="!showField">
          <div class="row">
            <div class="col-1">

              <div @click.prevent="toggleEdit(post.id)">
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
export default {
  data() {
    return {
      contentHeading: null,
      contentMessage: null,
      editedFieldId: null,
      fields: [
        {
          id: 1,
          value: "",
        }
      ],
      showField: false,
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
      },
      toggleEdit(id) {
      if (id) {
        this.editedFieldId = id;
        this.$nextTick(() => {
          if (this.$refs["field" + id]) {
            this.$refs["field" + id][0].focus();
            this.showField= true
          }
        });
      } else {
        this.editedFieldId = null;
      }
      this.showField= false
    },
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
}
ul li:not(:last-child){
  margin-bottom: 15px;
}
li h3 {
  color: rgb(7, 57, 132);
  font-weight: 600;
}
li p {
  font-size: 16px;
}
li i{
  font-size: 14px;
}
.editing{
  text-align: right;
}
.editable-input{
  width: 100%;
  border-radius: 4px;
  border: 1px solid lightgray;
  margin-bottom: 10px;
}
.editable-input:focus{
  box-shadow: none;
  border-color: lightgray;
}
.save-btn{
  background-color: lightgray;
  border: 1px solid lightgray;
  color: rgb(7, 57, 132);
}
.save-btn:hover{
  background-color: rgb(7, 57, 132);
  color: lightgray;
}
</style>
