import axios from 'axios'
import AuthHeaders from '../utils/AuthHeaders'
import { FETCH_CUSTOMERS, CREATE_CUSTOMER } from './types'

export const createCustomer = customer => async dispatch => {
	const res = await axios.post('http://localhost:5000/api/customers/create', customer, AuthHeaders)
	dispatch({ type: CREATE_CUSTOMER, payload: res.data })
}

export const fetchCustomers = () => async dispatch => {
	const res = await axios.get('http://localhost:5000/api/customers', AuthHeaders)
	dispatch({ type: FETCH_CUSTOMERS, payload: res.data })
}