import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

const VerifyEmail = () => {
	const { user } = useSelector(state => state)

	useEffect(() => {
		console.log(user)
	}, [])

	return (
		<div>
			Hi, {user.firstName}, please verify your email.
		</div>
	)
}

export default VerifyEmail