import React, { Component } from 'react'
import axios from 'axios'
import AuthHeaders from '../../../utils/AuthHeaders'
import { Divider } from 'antd'

class InvoiceDetails extends Component {
	state = {
		invoice: null,
		customer: null
	}

	async componentDidMount() {
		const invoice = await axios.get(`http://localhost:5000/api/invoices/${this.props.match.params.id}`, AuthHeaders)
		const customer = await axios.get(`http://localhost:5000/api/customers/${invoice.data._customer}`, AuthHeaders)
		this.setState({ invoice: invoice.data, customer: customer.data })
	}

	renderInvoice() {
		const { invoice, customer } = this.state
		if (invoice && customer) {
			return (
				<div>
					<div className="box">
						<h1>Invoice #{invoice.number}</h1>
						<Divider />
						<div className="invoice-customer">
							<h2>Customer</h2>
							<div><strong>{customer.name}</strong></div>
							<div>{customer.email}</div>
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

export default InvoiceDetails