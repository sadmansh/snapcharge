import axios from 'axios'
import AuthHeaders from '../utils/AuthHeaders'

export const createCustomer = (customer) => async dispatch => {
	const res = await axios.post('http://localhost:5000/api/customers/create', customer, AuthHeaders)
	console.log(res.data)
}