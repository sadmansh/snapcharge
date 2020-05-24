import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { Divider } from 'antd'

class InvoiceDetails extends Component {

	componentDidMount() {
		this.props.fetchInvoice(this.props.stripeId)
	}

	renderInvoice() {
		if (this.props.invoice) {
			const { invoice } = this.props
			return (
				<div>
					<div className="box">
						<h1>Invoice #{invoice.number}</h1>
						<Divider />
						<div className="invoice-customer">
							<h2>Customer</h2>
							<div><strong>{invoice.customer.name}</strong></div>
							<div>{invoice.customer.email}</div>
						</div>
						<Divider />
						<div className="invoice-items">
							<h2>Items</h2>
						</div>
						<Divider />
					</div>

				</div>
			)
		}			
	}

	render() {
		return (
			<div className="dashboard-item">
				{this.renderInvoice()}
			</div>
		)
	}
}

const mapStateToProps = ({ invoice }, ownProps) => {
	return { invoice, stripeId: ownProps.match.params.stripeId }
}

export default connect(mapStateToProps, actions)(InvoiceDetails)