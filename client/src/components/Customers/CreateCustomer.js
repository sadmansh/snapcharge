import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class CreateCustomer extends Component {
	state = {
		name: '',
		email: '',
		currency: ''
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const customer = this.state
		if (customer) this.props.createCustomer(customer)
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
					<input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} />
					<button type="submit">Create customer</button>
				</form>
			</div>
		) 
	}
}

export default connect(null, actions)(CreateCustomer)