import { FETCH_INVOICES, FETCH_INVOICE } from '../actions/types'

export function invoicesReducer(state = null, action) {
	switch (action.type) {
		case FETCH_INVOICES:
			return action.payload || false

		default:
			return state
	}
}

export function invoiceReducer(state = null, action) {
	switch (action.type) {
		case FETCH_INVOICE:
			return action.payload || false

		default:
			return state
	}
}