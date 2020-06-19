import React, { Component } from 'react'
import Cards from './Cards'
import './Payments.scss'

class Payments extends Component {
	render() {
		return (
			<div className="dashboard-item payments">
				<div className="box">
					<h1>Payments</h1>
					<Cards />
				</div>
			</div>
		)
	}
}

export default Payments