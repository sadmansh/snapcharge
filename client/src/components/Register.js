import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'

class Register extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit(e) {
		e.preventDefault()
		const user = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}
		if (user) this.props.registerUser(user)
	}

	render() {
		return (
			<div>
				Welcome to SnapCharge!

				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
					<input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
					<input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
}

export default connect(null, actions)(Register)