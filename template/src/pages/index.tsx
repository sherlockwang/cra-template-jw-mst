import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import TodoPage from './todo'
import ErrorBoundary from '~/components/ErrorBoundary'

const MainRouter: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="app">
          <Routes>
            <Route path="/" element={<TodoPage />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default observer(MainRouter)
