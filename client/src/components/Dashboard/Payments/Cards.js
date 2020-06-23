import React, { Component } from 'react'
import getCurrencySymbol from '../../../utils/getCurrencySymbol'

class Cards extends Component {

	renderAmount = amount => {
		if (!amount) amount = 0
		return getCurrencySymbol(this.props.currency) + (amount / 100).toFixed(2)
	}

	render() {
		const { data } = this.props
		return (
			<div className="payment-cards">
				<div className="card" style={{ backgroundImage: 'linear-gradient(to right, #5f70e3, #8161e3)' }}>
					<span className="card-title">Current balance</span>
					<span className="card-data">{this.renderAmount(data.received)}</span>
				</div>
				<div className="card" style={{ backgroundImage: 'linear-gradient(to right, #f53859, #f5593a)' }}>
					<span className="card-title">Yet to receive</span>
					<span className="card-data">{this.renderAmount(data.unpaid)}</span>
				</div>
				<div className="card" style={{ backgroundImage: 'linear-gradient(to right, #0fcaef, #0e75ef)' }}>
					<span className="card-title">Last Payout</span>
					<span className="card-data">$5600</span>
				</div>
				<div className="card" style={{ backgroundImage: 'linear-gradient(to right, #172a4c, #131539)' }}>
					<span className="card-title">Total payouts</span>
					<span className="card-data">{this.renderAmount(data.paidout)}</span>
				</div>
			</div>
		)
	}
}

export default Cards