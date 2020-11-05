import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import App from '~/pages'
import { RootStore, store } from '~/models'
import { ModelContext } from '~/models/modelContext'
import './styles/index.scss'

let storeCopy = store

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ModelContext.Provider value={storeCopy}>
        <Provider model={storeCopy}>
          <App />
        </Provider>
      </ModelContext.Provider>
    </React.StrictMode>,

    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./pages', () => {
    render()
  })

  // remain model data when hot reload
  module.hot.accept('./models', () => {
    const snapshot = getSnapshot(storeCopy)
    storeCopy = RootStore.create(snapshot)
    render()
  })
}

render()
