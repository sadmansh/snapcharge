import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class InvoiceList extends Component {
	
	componentDidMount() {
		this.props.fetchInvoices()
	}

	renderInvoices() {
		if (this.props.invoices) {
			return this.props.invoices.map(invoice => {
				return (
					<div key={invoice._id}>
						{invoice.name} - {invoice.email}
					</div>
				)
			})
		}
	}

	render() {
		return (
			<div>
				<h2>All invoices</h2>
				{this.renderInvoices()}
			</div>
		)
	}
}

const mapStateToProps = ({ invoices }) => {
	return { invoices }
}

export default connect(mapStateToProps, actions)(InvoiceList)