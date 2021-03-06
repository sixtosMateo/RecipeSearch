import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
// this comes from the package redux itself
import { createStore, applyMiddleware, compose } from 'redux'
// this comes from the reducer we created
import reducer from './reducers'

import { Provider } from 'react-redux'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// this comes from the reducer we created
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger))
)



ReactDOM.render(

  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
