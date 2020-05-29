import React, { Component } from 'react'
import axios from 'axios'
import AuthHeaders from '../../../utils/AuthHeaders'

class CustomerDetails extends Component {
	state = {
		customer: null
	}

	async componentDidMount() {
		const customer = await axios.get(`http://localhost:5000/api/customers/${this.props.match.params.id}`, AuthHeaders)
		this.setState({ customer: customer.data })
	}

	renderCustomer() {
		const { customer } = this.state
		if (customer) {
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

export default CustomerDetails