import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    lastId: 0
  },
  mutations: {
    initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		},
    createTask (state, task) {
      state.tasks.push(task);
      state.lastId++;
    },
    updateTask (state, params) {
      console.log(params.id);
      
      Object.assign(state.tasks[params.id], {
        [params.field]: params.value
      });
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1);
    }
  },
  actions: {}
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});


export default store;