import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import App from './components/App'
import reducers from './reducers'
import * as serviceWorker from './serviceWorker'
import jwt_decode from 'jwt-decode'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

const token = localStorage.getItem('token')
if (token) {
	const decodedToken = jwt_decode(token)
	if (decodedToken.user) store.dispatch({ type: 'FETCH_USER', payload: decodedToken.user })
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister()