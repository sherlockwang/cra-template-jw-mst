import { render } from '@testing-library/react'
import TodoItem from './index'
import { TodoItem as model } from '~/models/Todo/TodoItem'

test('case: expect TodoItem render correct', () => {
  const data = model.create({
    status: false,
    name: 'test',
    time: 30,
  })

  render(<TodoItem todoItem={data} />)
})
