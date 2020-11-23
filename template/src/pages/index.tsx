import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import TodoPage from './todo'
import ErrorBoundary from '~/components/ErrorBoundary'

const MainRouter: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="app">
          <Switch>
            <Route path="/" exact component={TodoPage} />
          </Switch>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default observer(MainRouter)
