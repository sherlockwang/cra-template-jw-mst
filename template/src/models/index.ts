import { createContext, useContext } from 'react'
import { types, Instance, unprotect, onSnapshot, SnapshotIn } from 'mobx-state-tree'
import { connectReduxDevtools } from 'mst-middlewares'
import { Todo } from './Todo'
import { TodoModel } from './Todo/Todo'

const initTodo: SnapshotIn<TodoModel> = {}

// Root Store
export const RootStore = types.model('Main', {
  Todo: types.optional(Todo, initTodo),
})

export type RootStoreModel = Instance<typeof RootStore>

// init store variable
let initStore = {}

/**
 * * Comment out snapshot code for reduce wired bugs in development
 */
// check if has local storage store
// if (localStorage.getItem('storeSnapshot')) {
//   const json = JSON.parse(localStorage.getItem('storeSnapshot'))
//   if (RootStore.is(json)) initStore = json
// }
// when change store value, get a snapshot save into local storage
// onSnapshot(store, snapshot => {
//   localStorage.setItem('storeSnapshot', JSON.stringify(snapshot))
// })

/**
 * * Comment out redux dev tools code by default, uncomment it if you need it.
 */
// connect to redux dev tools if installed
// if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
//   connectReduxDevtools(require("remotedev"), store)
// }

// Create store instance
const store = RootStore.create(initStore)

/**
 * * Comment out unprotect store by default, only use this when you know well of your developers.
 */
// unprotect(store)

// Create context for store
const ModelContext = createContext(store)
const useStore = () => useContext(ModelContext)

export { store, ModelContext, useStore }
