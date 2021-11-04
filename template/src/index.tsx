import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import App from '~/pages'
import { RootStore, store } from '~/models'
import { ModelContext } from '~/models/modelContext'

let storeCopy = store

// Global Style
const GlobalStyle = createGlobalStyle`
  @import-normalize; /* bring in normalize.css styles */

  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;

    .app {
      height: 100%;
    }
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ModelContext.Provider value={storeCopy}>
        <Provider model={storeCopy}>
          <App />
        </Provider>
      </ModelContext.Provider>
      <GlobalStyle />
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
