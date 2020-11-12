import { SnapshotIn } from 'mobx-state-tree'
import { Todo, TodoModel } from './Todo'

const initSnapshot: SnapshotIn<TodoModel> = {
  todoList: [
    {
      name: 'test1',
      status: false,
      time: 30,
    },
    {
      name: 'test2',
      status: true,
      time: 60,
    },
  ],
  filter: 'all',
  allStatus: false,
}

it('case: expect Todo Model create correctly', () => {
  const model = Todo.create(initSnapshot)

  expect(model.todoList[0].name).toEqual('test1')
  expect(model.totalItem).toEqual(2)
  expect(model.activeItem).toEqual(1)
  expect(model.totalTime).toEqual(90)
})

it('case: expect Todo Model toggle all correctly', () => {
  const model = Todo.create(initSnapshot)

  model.toggleAll()

  expect(model.todoList[0].status).toEqual(model.allStatus)
})

it('case: expect Todo Model add item correctly', () => {
  const model = Todo.create(initSnapshot)
  model.newTodoTime = 45
  model.newTodoName = '3333'
  model.addTodo()

  expect(model.totalItem).toEqual(3)
})

it('case: expect Todo Model remove item correctly', () => {
  const model = Todo.create(initSnapshot)
  model.removeTodo(model.todoList[0])

  expect(model.totalItem).toEqual(1)
})
