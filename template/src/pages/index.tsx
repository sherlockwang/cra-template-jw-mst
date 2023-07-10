import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ErrorBoundary } from 'react-error-boundary'
import TodoPage from './todo'

const MainRouter: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong, please refresh</div>}>
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
