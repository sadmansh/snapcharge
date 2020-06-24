import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

const Register = props => {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		country: 'BD',
		password: ''
	})

	const dispatch = useDispatch()

	const { countries } = useSelector(state => state)

	useEffect(() => {
		dispatch(actions.fetchCountries())
	}, [dispatch])

	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(actions.registerUser(user, props.history))
	}

	const renderCountries = () => {
		if (countries) {
			return countries.map(country => <option key={country.iso2Code} value={country.iso2Code}>{country.name}</option>)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" name="firstName" placeholder="First name" onChange={handleChange} />
				<input type="text" name="lastName" placeholder="Last name" onChange={handleChange} />
				<input type="email" name="email" placeholder="Email address" onChange={handleChange} />
				<input type="password" name="password" placeholder="Password" onChange={handleChange} />
				<select name="country" value={user.country} onChange={handleChange}>
					{renderCountries()}
				</select>
				<button type="submit">Register</button>
			</form>
		</div>
	)
}

export default withRouter(Register)