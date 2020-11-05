import { types, Instance, unprotect, onSnapshot, SnapshotIn } from '~/models/Todo/ExampleModelGroup/node_modules/mobx-state-tree'
import { Todo, TodoItem } from './Todo'
import { TodoModel } from './Todo/Todo'

const initTodo: SnapshotIn<TodoModel> = {
  newTodo: TodoItem.create({
    name: '',
    time: 30,
    status: false,
  }),
  filter: 'all',
  allStatus: false
}

// Root Store
export const RootStore = types.model('RootStore', {
  Todo: types.optional(Todo, initTodo),
})

export type rootStoreModel = Instance<typeof RootStore>

// init store variable
let initStore = {}

// check if has local storage store
if (localStorage.getItem('storeSnapshot')) {
  const json = JSON.parse(localStorage.getItem('storeSnapshot'))
  if (RootStore.is(json)) initStore = json
}
// Create store instance
let store = RootStore.create(initStore)
// allow change store value outside action
unprotect(store)
// when change store value, get a snapshot save into local storage
onSnapshot(store, snapshot => {
  localStorage.setItem('storeSnapshot', JSON.stringify(snapshot))
})

export { store }

