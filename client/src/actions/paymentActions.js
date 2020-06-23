import axios from 'axios'
import AuthHeaders from '../utils/AuthHeaders'
import { FETCH_PAYMENTS } from './types'

export const fetchPaymentData = () => async dispatch => {
	const res = await axios.get('http://localhost:5000/api/payments/aggregate', AuthHeaders)
	dispatch({ type: FETCH_PAYMENTS, payload: res.data })
}