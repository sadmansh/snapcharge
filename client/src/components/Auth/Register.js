import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Register extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			country: 'BD',
			password: ''
		}
	}

	componentDidMount() {
		this.props.fetchCountries()
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const user = this.state
		if (user) this.props.registerUser(user, this.props.history)
	}
	
	renderCountriesSelect() {
		if (this.props.countries) {
			return this.props.countries.map(country => {
				return (
					<option key={country.iso2Code} value={country.iso2Code}>{country.name}</option>
				)
			})
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="firstName" placeholder="First name" value={this.state.firstName} onChange={this.handleChange} />
					<input type="text" name="lastName" placeholder="Last name" value={this.state.lastName} onChange={this.handleChange} />
					<input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} />
					<input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
					<select name="country" value={this.state.country} onChange={this.handleChange}>
						{this.renderCountriesSelect()}
					</select>
					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = ({ countries }) => {
	return { countries }
}

export default connect(mapStateToProps, actions)(withRouter(Register))