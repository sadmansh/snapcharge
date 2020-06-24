import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

const Login = props => {
	const [user, setUser] = useState({
		email: '',
		password: ''
	})

	const dispatch = useDispatch()

	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (user.email && user.password) dispatch(actions.loginUser(user.email, user.password, props.history))
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="email" name="email" onChange={handleChange} />
				<input type="password" name="password" onChange={handleChange} />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default withRouter(Login)