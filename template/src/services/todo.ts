import { get, post } from '~/utils/api'

const getTodos = async params => {
  let output = []

  try {
    const res = await get('api/todos.json', params)

    output = res.data
  } catch (error) {
    console.error(error)
  }

  return output
}

const postTodos = async params => {
  let output = {}

  try {
    const res = await post('api/createTodo.json', params)

    output = res.data
  } catch (error) {
    console.error(error)
  }

  return output
}

export { getTodos, postTodos }
