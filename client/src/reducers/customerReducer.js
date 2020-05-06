import { FETCH_CUSTOMERS } from '../actions/types'

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_CUSTOMERS:
			return action.payload || false

		default:
			return state
	}
}