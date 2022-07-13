import { observer } from 'mobx-react'
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import './index.css'

const TodoPage: React.FC<{}> = () => {
  return (
    <div className="todo-page">
      <TodoHeader />
      <TodoList />
      <TodoFilter />
    </div>
  )
}

export default observer(TodoPage)
