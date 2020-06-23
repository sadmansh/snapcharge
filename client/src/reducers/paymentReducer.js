import { FETCH_PAYMENTS } from '../actions/types'

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_PAYMENTS:
			return action.payload || false

		default:
			return state
	}
}