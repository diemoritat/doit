<template>
  <li class="card">
    <div class="card__content">
      <div class="card__content-top"> 
        <div class="card__title-holder">
          <p class="card__title" v-if="!isEditable"> {{ cardData.name }}</p> 
          <div class="card__input-holder" v-if="isEditable">
            <input class="card__input" type="text" ref="title" v-model="cardData.name" @keyup.enter="saveTitle" />
            <span class="card__input-deco"></span>
          </div>
        </div>
        
        <div class="card__icons">
          <span @click="editTitle"> <i class="material-icons md-dark">edit</i> </span> 
        </div>
      </div>
    </div>
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
      },
      description: {
        type: String,
        default: ''
      }
    }
  },
  data() {
    return {
      isEditable: false
    }
  },
  methods: {
    updateTask(id, field, value) {
      this.$store.commit('updateTask', { 
        id,
        field,
        value
      });
    },
    deleteTask(id) {
      this.$store.commit('deleteTask', { id });
    },
    editTitle(event) {
      this.isEditable = true;
      setTimeout(() => {
        this.$refs.title.focus();
      }, 10);
      
    },
    saveTitle(event) {
      this.isEditable = false;
      this.$store.commit('updateTask', { 
        id: this.cardData.id,
        field: 'name',
        value: this.cardData.name
      });
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

  &__content-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  &__title-holder {
    flex: 0;
    position: relative;
    width: 80%;
    flex-basis: 80%;
  }

  &__title {
    padding: 4px 0;
  }

  &__input-holder {
    position: relative;
  }

  &__input {
    padding: 5px;
    border: 0;
    width: 100%;
    font-weight: 700;
    font-size: 0.9rem;
    color: $color4;

    &~span {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: $color2;
      transition: width 0.2s ease-in-out;
    }

    &:focus {
      outline: 0;

      &~span {
        width: 100%;
        transition: width 0.3s ease-in-out;
      }
    }
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

  &__icons {
    cursor: pointer;
    flex-shrink: 0;
    margin-left: 10px;

    .material-icons {
      color: $color7;
      transition: color 0.1s linear;
    }

    span:hover {
      .material-icons {
        color: $color3;
        transition: color 0.2s linear;
      }
    }
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
