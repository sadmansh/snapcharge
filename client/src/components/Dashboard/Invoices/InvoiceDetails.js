import React, { Component } from 'react'
import axios from 'axios'
import AuthHeaders from '../../../utils/AuthHeaders'
import { Table, Divider, Descriptions } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import getCurrencySymbol from '../../../utils/getCurrencySymbol'
import moment from 'moment'

class InvoiceDetails extends Component {
	state = {
		invoice: null,
		customer: null,
	}

	async componentDidMount() {
		const invoice = await axios.get(`http://localhost:5000/api/invoices/${this.props.match.params.id}`, AuthHeaders)
		const customer = await axios.get(`http://localhost:5000/api/customers/${invoice.data._customer}`, AuthHeaders)
		const payment = await axios.get(`http://localhost:5000/api/payments/${invoice.data._id}`, AuthHeaders)
		this.setState({ invoice: invoice.data, customer: customer.data, payment: payment.data })
	}

	renderInvoiceItems = () => {
		const { status, lines } = this.state.invoice
		if (status) {
			const columns = [
				{ key: 'description', dataIndex: 'description', title: 'Description' },
				{ key: 'amount', dataIndex: 'amount', title: 'Amount', align: 'right', render: amount => getCurrencySymbol(this.state.invoice.currency) + (amount / 100).toLocaleString() },
			]
			return (
				<Table dataSource={lines.reverse()} columns={columns} rowKey="id" pagination={lines.length > 10 && 10} footer={(lines) => {
					let total = (this.state.invoice.total / 100).toLocaleString()
					console.log(total)
					console.log(lines)
					return (
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<strong>Total</strong>
							<span>{getCurrencySymbol(this.state.invoice.currency) + total}</span>
						</div>
					)
				}} />
			)
		}
	}

	renderInvoice() {
		const currencyOptions = [
			{ key: 'usd', label: 'US Dollar' },
			{ key: 'eur', label: 'Euro' },
			{ key: 'aud', label: 'Australian Dollar' },
			{ key: 'gbp', label: 'British Pound' }
		]
		const { invoice, customer, payment } = this.state
		if (customer) {
			const currency = currencyOptions.find(option => option.key === invoice.currency)
			return (
				<div>
					<div className="box">
						<h1>
							Invoice #{invoice.number}
							{invoice.status === 'paid' ? <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginLeft: '.5rem' }} /> : ''}
						</h1>
						<Divider />
						<div className="invoice-customer">
							<h2>Customer</h2>
							<div><strong>{customer.name}</strong></div>
							<div>{customer.email}</div>
						</div>
						<Divider />
						<div className="invoice-items">
							<h2>Items</h2>
							{this.renderInvoiceItems()}
							<Divider />
						</div>
						<div className="invoice-details">
							<h2>Invoice details</h2>
							<Descriptions column={1} bordered size="small">
								<Descriptions.Item label="Status" span={1}>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</Descriptions.Item>
								<Descriptions.Item label="Currency" span={1}>{currency.key.toUpperCase()} - {currency.label}</Descriptions.Item>
								<Descriptions.Item label={invoice.status === 'paid' ? 'Paid at' : 'Due on'} span={1}>
									{invoice.status === 'paid' ? moment(invoice.updatedAt).format('MMM D, YYYY, h:mm A') : moment.unix(invoice.dueDate).format('MMM D, YYYY, h:mm A')}
								</Descriptions.Item>
							</Descriptions>
							<Divider />
						</div>
						<div className="payment-details">
							<h2>Payment details</h2>
							<Descriptions column={1} bordered size="small">
								<Descriptions.Item label="Amount" span={1}>
									{getCurrencySymbol(invoice.currency)}{(payment.subtotal / 100).toLocaleString()}
								</Descriptions.Item>
								<Descriptions.Item label="Stripe fees" span={1}>
									{getCurrencySymbol(invoice.currency)}{(payment.stripeFees / 100).toLocaleString()}
								</Descriptions.Item>
								<Descriptions.Item label="Our fees" span={1}>
									{getCurrencySymbol(invoice.currency)}{(payment.fees / 100).toLocaleString()}
								</Descriptions.Item>
								<Descriptions.Item label="Total fees" span={1}>
									{getCurrencySymbol(invoice.currency)}{(payment.totalFees / 100).toLocaleString()}
								</Descriptions.Item>
								<Descriptions.Item label="Net" span={1}>
									{getCurrencySymbol(invoice.currency)}{(payment.total / 100).toLocaleString()}
								</Descriptions.Item>
							</Descriptions>
						</div>
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