import { FETCH_INVOICES, CREATE_INVOICE } from '../actions/types'

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_INVOICES:
			return action.payload || false

		case CREATE_INVOICE:
			return [action.payload, ...state] || false

		default:
			return state
	}
}