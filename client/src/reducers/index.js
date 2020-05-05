import { combineReducers } from 'redux'
import authReducer from './authReducer'
import countriesReducer from './countriesReducer'

export default combineReducers({
	user: authReducer,
	countries: countriesReducer
})