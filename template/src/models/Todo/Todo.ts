import { types, Instance, destroy, getSnapshot, flow } from 'mobx-state-tree'
import { TodoItem, TodoItemModel } from './TodoItem'
import { get } from '~/utils/api'

export const Todo = types
  .model('Todo', {
    todoList: types.optional(types.array(TodoItem), []),
    filter: types.maybe(
      types.union(
        types.literal('all'),
        types.literal('active'),
        types.literal('completed')
      )
    ),
    allStatus: false,
    newTodo: TodoItem,
  })
  .views(self => ({
    get totalItem() {
      return self.todoList.length
    },
    get activeItem() {
      return self.todoList.filter((item: TodoItemModel) => !item.status).length
    },
    get totalTime() {
      return self.todoList.reduce(
        (prev: number, curr: TodoItemModel) => prev + curr.time,
        0
      )
    },
    get displayTodoList() {
      if (self.filter === 'active') {
        return self.todoList.filter(item => !item.status)
      } else if (self.filter === 'completed') {
        return self.todoList.filter(item => item.status)
      }
      return self.todoList
    },
  }))
  .actions(self => ({
    getTodoList: flow(function* getOrderList(params: object) {
      const res = yield get('api/childlist.json', params)

      self.todoList = res.data
    }),
    addTodo() {
      const newTodoData = getSnapshot<TodoItemModel>(self.newTodo)
      if (!self.todoList.find(item => item.name === newTodoData.name)) {
        self.todoList.push({ ...newTodoData })
        self.newTodo.reset()
      } else {
        alert('already existed')
      }
    },
    toggleAll() {
      self.allStatus = !self.allStatus
      self.todoList.forEach(item => {
        item.changeStatus(self.allStatus)
      })
    },
    removeTodo(item: TodoItemModel) {
      destroy(item)
    },
  }))

export type TodoModel = Instance<typeof Todo>
