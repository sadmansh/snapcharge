import { combineReducers } from 'redux'
import authReducer from './authReducer'
import countriesReducer from './countriesReducer'
import customerReducer from './customerReducer'
import invoiceReducer from './invoiceReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	user: authReducer,
	countries: countriesReducer,
	customers: customerReducer,
	invoices: invoiceReducer,
	form: formReducer
})