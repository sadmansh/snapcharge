import { FETCH_CUSTOMERS, CREATE_CUSTOMER } from '../actions/types'

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_CUSTOMERS:
			return action.payload || false

		case CREATE_CUSTOMER:
			return [action.payload, ...state] || false

		default:
			return state
	}
}