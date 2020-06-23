import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import Cards from './Cards'
import './Payments.scss'

class Payments extends Component {

	componentDidMount() {
		this.props.fetchPaymentData()
	}

	render() {
		return (
			<div className="dashboard-item payments">
				<div className="box">
					<h1>Payments</h1>
					{this.props.payments ? 
						<Cards currency={this.props.currency} data={this.props.payments} /> : ''
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ user: { currency }, payments }) => {
	return { currency: currency, payments }
}

export default connect(mapStateToProps, actions)(Payments)