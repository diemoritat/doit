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
			if(localStorage.getItem('store')) {
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
      const item = state.tasks.find(element => element.id == params.id);
      Object.assign( item , { [params.field]: params.value });
    },
    deleteTask(state, param) {
      state.tasks = state.tasks.filter(task => task.id !== param.id)
    }
  },
  actions: {}
});

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});


export default store;