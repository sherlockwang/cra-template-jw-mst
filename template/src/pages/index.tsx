import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { history } from '~/models'
import Example from './example-page'

function MainRouter() {
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Example />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default observer(MainRouter)
