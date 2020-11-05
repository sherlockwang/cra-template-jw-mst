import { types, Instance, getParent, cast } from 'mobx-state-tree'
import { TodoModel } from './Todo'

export const TodoItem = types
  .model('TodoItem', {
    status: false,
    name: '',
    time: 30,
  })
  .actions(self => ({
    changeStatus(status: boolean) {
      self.status = status
    },
    changeName(name: string) {
      self.name = name
    },
    changeTime(time: number) {
      self.time = time
    },
    remove() {
      getParent<TodoModel>(self, 2).removeTodo(cast(self))
    },
    reset() {
      self.status = false
      self.name = ''
      self.time = 30
    },
  }))

export type TodoItemModel = Instance<typeof TodoItem>
