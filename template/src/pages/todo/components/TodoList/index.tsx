import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/models'
import TodoItem from '../TodoItem'
import { TodoItemModel } from '~/models/Todo/TodoItem'

const TodoList: React.FC<{}> = () => {
  const { Todo: model } = useStore()

  const toggleAll = useCallback(() => {
    model.toggleAll()
  }, [])

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={toggleAll}
        checked={model.activeItem === 0}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {model.displayTodoList.map((todoItem: TodoItemModel) => 
          <TodoItem key={todoItem.name} todoItem={todoItem} />
        )}
      </ul>
    </section>
  )
}

export default observer(TodoList)
