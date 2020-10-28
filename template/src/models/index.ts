import { createContext } from 'react'
import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import ExampleModelGroup from './ExampleModelGroup'

/**
 * Init for Mobx React Router
 * Use Hash History
 */
const browserHistory = createBrowserHistory()
const Routing = new RouterStore()
export const history = syncHistoryWithStore(browserHistory, Routing)

export const stores = {
  Routing,
  ...ExampleModelGroup
}

export const ModelContext = createContext(stores)
