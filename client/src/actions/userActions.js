import axios from 'axios'
import history from '../utils/history'
import AuthHeaders from '../utils/AuthHeaders'

export const loginUser = (email, password) => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
		dispatch({ type: 'FETCH_USER', payload: res.data })
		localStorage.setItem('token', res.data.token)
		history.push('/dashboard')
	} catch (error) {
		console.error(error)
	}
}

export const registerUser = (user) => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/api/auth/register', user)
		dispatch({ type: 'FETCH_USER', payload: res.data })
		localStorage.setItem('token', res.data.token)
		history.push('/dashboard')	
	} catch (error) {
		console.error(error)
	}
}