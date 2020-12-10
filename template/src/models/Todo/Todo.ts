import { types, Instance, destroy, flow } from 'mobx-state-tree'
import { TodoItem, TodoItemModel } from './TodoItem'
import { get } from '~/utils/api'

export const Todo = types
  .model('Todo')
  .props({
    todoList: types.optional(types.array(TodoItem), []),
    filter: types.optional(
      types.union(
        types.literal('all'),
        types.literal('active'),
        types.literal('completed')
      ),
      'all'
    ),
    allStatus: false,
    newTodoName: '',
    newTodoTime: 30,
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
      if (!self.todoList.find(item => item.name === self.newTodoName)) {
        self.todoList.push({
          name: self.newTodoName,
          time: self.newTodoTime,
          status: false,
        })
        this.resetNewTodo()
      } else {
        alert('already existed')
      }
    },
    setFilter(filter: 'all' | 'active' | 'completed') {
      self.filter = filter
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
    resetNewTodo() {
      self.newTodoName = ''
      self.newTodoTime = 30
    },
  }))

export type TodoModel = Instance<typeof Todo>
