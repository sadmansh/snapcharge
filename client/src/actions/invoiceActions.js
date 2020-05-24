import axios from 'axios'
import AuthHeaders from '../utils/AuthHeaders'
import { FETCH_INVOICES, FETCH_INVOICE } from './types'

export const createInvoice = invoice => async dispatch => {
	invoice = {
		customer: {
			stripeId: 'cus_HKoh0pXvioVHxb',
			id: '5ec9d4140abc226d9de0e702',
			currency: 'usd'
		},
		collectionMethod: 'send_invoice',
		daysUntilDue: 7,
		invoiceItems: [
			{ description: 'Website redesign', amount: 30000 },
			{ description: 'Website maintenance', amount: 7000 }
		]
	}
	const res = await axios.post('http://localhost:5000/api/invoices/create', invoice, AuthHeaders)
	console.log(res.data)
}

export const fetchInvoices = () => async dispatch => {
	const res = await axios.get('http://localhost:5000/api/invoices', AuthHeaders)
	dispatch({ type: FETCH_INVOICES, payload: res.data })
}

export const fetchInvoice = stripeId => async dispatch => {
	const res = await axios.get(`http://localhost:5000/api/invoices/${stripeId}`, AuthHeaders)
	dispatch({ type: FETCH_INVOICE, payload: res.data })
}