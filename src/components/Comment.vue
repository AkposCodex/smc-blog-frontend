<script>
import { getAPI } from "../axios";
import { formatDate } from "../helpers/date";
export default {
  data() {
    return {
      comment: [],
      slg: this.$route.params.slug.toString(),
    };
  },
  created() {
    getAPI
      .get("/comment?post=" + this.slg)
      .then((response) => {
        "";
        this.comment = response.data;
      })
      .catch((err) => {});
  },
  methods: {
    formatDate,
    del(id) {
      getAPI
        .delete("/comment/" + id)
        .then((response) => {
          this.success = true;
          this.$router.go();
        })
        .catch((err) => {});
    },
  },
};
</script>

<template>
  <div style="display: block; margin: 15px" v-if="!comment || !comment.length">
    <p class="text-center font-bold">Be the first to comment.</p>
  </div>
  <div class="comment" v-else>
    <b>{{ comment.length }} Comments</b>
    <div v-for="comments in comment" :key="comments.id">
      <hr />
      <br /><br />
      <div class="comment__flex">
        <div class="container">
          <div class="avatar col">
            <div class="user user--refresh">
              <div>{{ comments.name[0] }}</div>
            </div>
          </div>
          <div class="col2">
            <b>{{ comments.name }}</b>
            <br />
            <p>
              <span class="tm"> {{ formatDate(comments.created_on) }} </span>
            </p>
            <br />
            <div class="bx">{{ comments.body }}</div>
            <div class="comment__flex-btn hidden">
              <form method="delete" @submit.prevent="del(comments.id)">
                <button class="del">Delete</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.col1 {
  width: 5%;
}
.col2 {
  width: 92%;
}
.avatar .user--refresh {
  color: #000;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  justify-content: center;
}
.avatar .user {
  position: relative;
  background: #dbdfe4;
  padding: 0;
}

.bx {
  display: block;
  line-height: 21px;
  overflow-wrap: break-word;
  font-weight: 400;
  font-style: normal;
  font-size: 100%;
}
.tm {
  font-size: 80%;
}
.comment__flex {
  font-size: 0.9em;
}

.comment__flex-btn {
  font-size: 80%;
  margin-left: 5px;
  color: #0086e3;
}
</style>
