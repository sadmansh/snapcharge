import { combineReducers } from 'redux'
import authReducer from './authReducer'
import countriesReducer from './countriesReducer'
import customerReducer from './customerReducer'
import invoiceReducer from './invoiceReducer'

export default combineReducers({
	user: authReducer,
	countries: countriesReducer,
	customers: customerReducer,
	invoices: invoiceReducer
})