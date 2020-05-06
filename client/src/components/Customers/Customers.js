import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import CreateCustomer from './CreateCustomer'
import CustomerList from './CustomerList'

class Customers extends Component {
	render() {
		return (
			<div>
				<CreateCustomer />
				<CustomerList />
			</div>
		)
	}
}

export default connect(null, actions)(Customers)