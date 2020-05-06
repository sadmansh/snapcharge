import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class CustomerList extends Component {
	
	componentDidMount() {
		this.props.fetchCustomers()
	}

	renderCustomers() {
		if (this.props.customers) {
			return this.props.customers.map(customer => {
				return (
					<div key={customer._id}>
						{customer.name} - {customer.email}
					</div>
				)
			})
		}
	}

	render() {
		return (
			<div>
				<h2>All customers</h2>
				{this.renderCustomers()}
			</div>
		)
	}
}

const mapStateToProps = ({ customers }) => {
	return { customers }
}

export default connect(mapStateToProps, actions)(CustomerList)