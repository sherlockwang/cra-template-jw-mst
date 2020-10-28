import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from '~/pages'
import { stores, ModelContext } from '~/models'
import './styles/index.scss'

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ModelContext.Provider value={stores}>
        <Provider model={stores}>
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
}

render()
