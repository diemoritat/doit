<template>
  <div class="new-task">
    <label class="new-task__label" for="create-task"><strong> Create a new task </strong></label>
    <form class="new-task__input-holder" @submit.prevent="createTask">
      <input class="new-task__input" type="text" name="create-task" id="create-task" placeholder="Enter an activity..." v-model.trim="newTask.name" @keyup.enter.native="createTask"/>
      <button class="new-task__submit" type="submit">+</button>

      <div class="new-task__error" v-show="(errorMessage !== '')">
        {{errorMessage}}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewTask',
  data() {
    return {
      newTask: {
        name: '',
        status: 1,
        description: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    createTask(event) {
      const reg = /^([\w\d\.\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/;
      
      if(reg.test(this.newTask.name) ) {
        this.errorMessage = '';

        this.$store.commit('createTask', { 
          id: this.newTaskId,
          ...this.newTask
        });

        //clear task name input
        this.newTask.name = '';
        event.target.reset();
        return false;
      }

      this.errorMessage = `Invalid task name.
      Only numbers and letters allowed.`;
    }
  },
  computed: {
    newTaskId() {
      return this.$store.state.lastId;
    }
  }
}
</script>

<style lang="scss">
.new-task {
  width: 100%;

  &__input-holder {
    display: block;
    position: relative;
  }

  &__input {
    width: calc(100% - 20px);
    border: 0;
    background-color: $color3;
    padding: 12px 10px;
    border-radius: 5px 0 0 5px;
    color: #fff;
    font-weight: 700;

    &:focus {
      outline: 0;
      border-bottom: 1px solid #fff;
    }
  }

  &__submit {
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background-color: #fff;
    margin-left: -20px;
  }

  &__error {
    font-size: 0.7rem;
    color: $color3;
    font-weight: 700;
    padding-top: 10px;
  }
}
</style>
