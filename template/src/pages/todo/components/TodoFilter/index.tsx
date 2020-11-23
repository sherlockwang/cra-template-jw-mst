import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { useStore } from '~/models/modelContext'

const TodoFilter: React.FC<{}> = () => {
  const { Todo: model } = useStore()

  const onFilter = useCallback((filter) => {
    return () => {
      model.filter = filter
    }
  }, [])

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{model.activeItem}</strong> left&nbsp;&nbsp;
      </span>
      <span className="todo-count">
        <strong>{model.totalTime}</strong> mins needed
      </span>
      <ul className="filters">
        <li>
          <a onClick={onFilter('all')} className={`${model.filter === 'all' && 'selected'}`}>
            All
          </a>
        </li>{' '}
        <li>
          <a
            onClick={onFilter('active')}
            className={`${model.filter === 'active' && 'selected'}`}
          >
            Active
          </a>
        </li>{' '}
        <li>
          <a
            onClick={onFilter('completed')}
            className={`${model.filter === 'completed' && 'selected'}`}
          >
            Completed
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default observer(TodoFilter)
