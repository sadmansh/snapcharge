import axios from 'axios'
import AuthHeaders from '../utils/AuthHeaders'
import { FETCH_INVOICES } from './types'

export const createInvoice = invoice => async dispatch => {
	invoice.customer = {
		id: invoice.customer.split(',')[0].trim(),
		stripeId: invoice.customer.split(',')[1].trim(),
		currency: invoice.currency
	}
	invoice.collectionMethod = 'send_invoice'
	const res = await axios.post('http://localhost:5000/api/invoices/create', invoice, AuthHeaders)
	console.log(res.data)
}

export const fetchInvoices = () => async dispatch => {
	const res = await axios.get('http://localhost:5000/api/invoices', AuthHeaders)
	dispatch({ type: FETCH_INVOICES, payload: res.data })
}