import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/models'

const TodoHeader: React.FC<{}> = () => {
  const { Todo: model } = useStore()

  const handleNewTodoKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return
    }

    model.addTodo()
  }, [])

  const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    model.setNewTodoName(e.target.value)
  }, [])

  const onTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    model.setNewTodoTime(+e.target.value)
  }, [])

  return (
    <header className="header">
      <h1>MST TS Todo Example</h1>
      <div className="todo-edit-group">
        <input
          className="new-todo"
          placeholder="how long?"
          value={model.newTodoTime}
          onChange={onTimeChange}
          style={{ width: '120px' }}
        />
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={model.newTodoName}
          onChange={onNameChange}
          onKeyDown={handleNewTodoKeyDown}
        />
      </div>
    </header>
  )
}

export default observer(TodoHeader)
