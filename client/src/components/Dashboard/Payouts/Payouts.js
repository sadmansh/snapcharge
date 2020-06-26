import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as actions from '../../../actions'
import Cards from './Cards'
import './Payouts.scss'

const Payouts = () => {

	const { currency } = useSelector(state => state.user)
	
	useEffect(() => {
		if (currency) console.log(currency)
	}, [])

	return (
		<div className="dashboard-item payments">
			<div className="box">
				<h1>Payouts</h1>
			</div>
		</div>
	)
}

export default Payouts