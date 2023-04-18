import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';
import { Item } from '../interfaces'



interface RootState {
  isLoggedIn: boolean,
  drawer: boolean,
  items: Array<Item>
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
 });

const store = createStore<RootState>({
  state: {
    isLoggedIn: false,
    drawer: false,
    items: []
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    getDrawer: state =>
    {
      return state.drawer;
    },
    getItems: state =>
    {
      return state.items;
    }
  },
    actions: {
    stateRemoveItem({ commit }: any, item: Item) {
      commit('removeItem', item.id)
    }
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
    addItem(state, itemToAdd: Item) {
      state.items.push(itemToAdd);
    },
    saveItem(state, itemToEdit: Item) {
     state.items.forEach((item : Item ) => {
      if (item.id == itemToEdit.id)
      {
        item.isoName = itemToEdit.isoName;
        item.isoMark = itemToEdit.isoMark;
        item.symbol = itemToEdit.symbol;
      }
     });
    },
    removeItem(state, itemToRemove: Item) {
     const items = state.items.filter( item => itemToRemove != item);
     state.items = items;
    },
    toggleDrawer(state, drawer : boolean)
    {
      state.drawer = drawer;
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store
