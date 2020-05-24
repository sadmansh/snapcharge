import axios from 'axios'
import { FETCH_USER, FETCH_COUNTRIES } from './types'

export const loginUser = (email, password, history) => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
		dispatch({ type: FETCH_USER, payload: res.data })
		localStorage.setItem('token', res.data.token)
		history.push('/dashboard')
	} catch (error) {
		console.error(error)
	}
}

export const registerUser = (user, history) => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/api/auth/register', user)
		dispatch({ type: FETCH_USER, payload: res.data })
		localStorage.setItem('token', res.data.token)
		history.push('/dashboard')	
	} catch (error) {
		console.error(error)
	}
}

export const fetchCountries = () => async dispatch => {
	try {
		const res = await axios.get('http://localhost:5000/api/user/countries')
		dispatch({ type: FETCH_COUNTRIES, payload: res.data.countries })
	} catch (error) {
		console.error(error.message)
	}
}