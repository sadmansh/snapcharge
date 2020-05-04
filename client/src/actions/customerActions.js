import axios from 'axios'
import history from '../utils/history'
import AuthHeaders from '../utils/AuthHeaders'

export const createCustomer = () => async dispatch => {
	const res = await axios.post('http://localhost:5000/api/customers/create', { email: 'samson@gmail.com', name: 'Samson Khan', currency: 'usd' }, AuthHeaders)
	console.log(res.data)
}