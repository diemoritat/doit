<template>
  <li class="card">
    <p class="card__content">
      <strong>{{ cardData.name }}</strong>
    </p>
    <div class="card__actions">
      <p class="card__actions-label">Move this task to:</p>
      <button class="card__button  card__button--to-do" v-show="(cardData.status !== 1)" type="submit" @click="updateTask(cardData.id, 'status', 1)">To Do</button>
      <button class="card__button  card__button--in-progress" v-show="(cardData.status !== 2)" type="submit" @click="updateTask(cardData.id, 'status', 2)">In Progress</button>
      <button class="card__button  card__button--done" v-show="(cardData.status !== 0)" type="submit" @click="updateTask(cardData.id, 'status', 0)">Done</button>
    </div>
    <div class="card__actions">
      <p class="card__actions-label">Delete this task?</p>
      <button class="card__button  card__button--delete" type="submit" @click="deleteTask(cardData.id)">Delete</button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cardData: {
      type: Object,
      required: true,
      id: {
        type: Number
      },
      name: {
        type: String
      },
      status: {
        type: Number
      }
    }
  },
  methods: {
    updateTask(id, field, value){
      this.$store.commit('updateTask', { 
        id,
        field,
        value
      });
    },
    deleteTask(id){
      this.$store.commit('deleteTask', { id });
    }
  }
}
</script>

<style lang="scss">
.card {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: left;

  &:last-child() {
    margin-bottom: 0;
  }

  &__content {
    //flex: 1;
    width: 100%;
    border-bottom: 1px solid #ececec;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  &__actions {
    width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  &__actions-label {
    font-size: 0.7rem;
    margin-bottom: 5px;
  }

  &__button {
    align-self: flex-end;
    padding: 5px;
    border: 0;
    border-radius: 5px;
    margin-right: 5px;

    &--to-do {
      background-color: $btn-status1;
    }

    &--in-progress {
      background-color: $btn-status2;
    }

    &--done {
      background-color: $btn-status3;
    }

    &--delete {
      background-color: $btn-status0;
    }
  }
}
</style>
