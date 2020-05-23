import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'

class CustomerDetails extends Component {

	componentDidMount() {
		this.props.fetchCustomers()
	}

	renderCustomer() {
		if (this.props.customers) {
			const { match: { params: { stripeId } } } = this.props
			let customer = this.props.customers.find(customer => {
				return customer.stripeId === stripeId
			})
			return (
				<div>
					{customer.name}
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderCustomer()}
			</div>
		)
	}
}

const mapStateToProps = ({ customers }) => {
	return { customers }
}

export default connect(mapStateToProps, actions)(CustomerDetails)