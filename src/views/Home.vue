<template>
  <div class="home">
    <Header/>
    <div class="grid">
      <div class="col-12">
        <div class="grid  justify-center">
          <section class="status-column  col-xs-12  col-sm-3">
            <h2 class="status-column__title">To Do</h2>
            <ul class="status-column__task-list">
              <p class="empty-message" v-show="(todo.length === 0)"> Woohoo! Nothing to be done... yet! </p>
              <Card :cardData="card" v-for="(card, index) of todo" :key="`card__${index}`" />
            </ul>
          </section>
          <section class="status-column  col-xs-12  col-sm-3">
            <h2 class="status-column__title">In Progress</h2>
            <ul class="status-column__task-list">
              <p class="empty-message" v-show="(progress.length === 0)"> ... Shouldn't you be doing something? </p>
              <Card :cardData="card" v-for="(card, index) of progress" :key="`card__${index}`" />
            </ul>
          </section>
          <section class="status-column  col-xs-12  col-sm-3">
            <h2 class="status-column__title">Done</h2>
            <ul class="status-column__task-list">
              <p class="empty-message" v-show="(done.length === 0)"> C'mon! Fill me! </p>
              <Card :cardData="card" v-for="(card, index) of done" :key="`card__${index}`" />
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import Header from "@/components/Header";
import HelloWorld from "@/components/HelloWorld";

export default {
  name: "home",
  components: {
    Card,
    Header,
    HelloWorld
  },
  computed: {
    todo() {
      return this.$store.state.tasks.filter(task => task.status === 1)
    },
    done() {
      return this.$store.state.tasks.filter(task => task.status === 0)
    },
    progress() {
      return this.$store.state.tasks.filter(task => task.status === 2)
    }
  }
};
</script>

<style lang="scss">
.status-column {
  background-color: $color6;

  @media (min-width: 768px) {
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
}
.empty-message {
  margin-top: 10px;
  font-size: 0.7rem;
}
</style>
