import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { TodoItemModel } from '~/models/Todo/TodoItem'

type Props = {
  todoItem: TodoItemModel
}

const TodoEditGroup = styled.div`
  display: flex;
`

const TodoItem: React.FC<Props> = ({ todoItem }: Props) => {
  const [edit, setedit] = useState(false)
  const [todoItemCopy, settodoItemCopy] = useState(todoItem)

  const onEdit = useCallback(() => {
    setedit(true)
    settodoItemCopy(clone(todoItem))
  }, [edit])

  const onSaveEdit = useCallback(() => {
    setedit(false)
    applySnapshot(todoItem, getSnapshot(todoItemCopy))
    settodoItemCopy(null)
  }, [edit])

  const onStatusChange = useCallback(() => {
    todoItem.changeStatus(!todoItem.status)
  }, [])

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      todoItemCopy.changeName(e.target.value)
    },
    [edit]
  )

  const onTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      todoItemCopy.changeTime(+e.target.value)
    },
    [edit]
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setedit(false)
        settodoItemCopy(null)
      } else if (e.key === 'Enter') {
        onSaveEdit()
      }
    },
    [edit]
  )

  return (
    <li className={`${todoItem.status && 'completed'} ${edit && 'editing'}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todoItem.status}
          onChange={onStatusChange}
        />
        <label onDoubleClick={onEdit}>
          {todoItem.time} - {todoItem.name}
        </label>
        <button className="destroy" onClick={todoItem.remove} />
      </div>
      <If condition={edit}>
        <TodoEditGroup>
          <input
            className="edit"
            value={todoItemCopy.time}
            onBlur={onSaveEdit}
            onChange={onTimeChange}
            onKeyDown={onKeyDown}
            style={{ width: '120px' }}
          />
          <input
            className="edit"
            value={todoItemCopy.name}
            onBlur={onSaveEdit}
            onChange={onNameChange}
            onKeyDown={onKeyDown}
          />
        </TodoEditGroup>
      </If>
    </li>
  )
}

export default observer(TodoItem)
