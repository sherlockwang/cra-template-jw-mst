import { TodoItem } from './TodoItem'

it('case: expect TodoItem Model create correctly', () => {
  const model = TodoItem.create({
    name: 'test',
    status: false,
    time: 30,
  })

  expect(model.name).toEqual('test')
  expect(model.time).toEqual(30)
})

it('case: expect TodoItem Model change name correctly', () => {
  const model = TodoItem.create({
    name: 'test',
    status: false,
    time: 30,
  })

  model.changeName('test1')

  expect(model.name).toEqual('test1')
})

it('case: expect TodoItem Model change status correctly', () => {
  const model = TodoItem.create({
    name: 'test',
    status: false,
    time: 30,
  })
  model.changeTime(60)

  expect(model.time).toEqual(60)
})
