import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import CreateCustomer from './CreateCustomer'
import CustomerList from './CustomerList'

class Customers extends Component {
	state = {
		modal: false
	}

	toggleAddCustomerModal = () => {
		this.setState({ modal: !this.state.modal })
	}

	render() {
		return (
			<div className="dashboard-item">
				<CreateCustomer modal={this.state.modal} toggleModal={this.toggleAddCustomerModal} />
				<CustomerList toggleModal={this.toggleAddCustomerModal} />
			</div>
		)
	}
}

export default connect(null, actions)(Customers)