import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import AuthHeaders from '../../../utils/AuthHeaders'
import { Table, Divider, Descriptions, Button } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import getCurrencySymbol from '../../../utils/getCurrencySymbol'
import moment from 'moment'

const InvoiceDetails = props => {
	const [invoice, setInvoice] = useState({})
	const [editMode, setEditMode] = useState(false)

	const fetchInvoice = useCallback(async () => {
		const invoice = await axios.get(`http://localhost:5000/api/invoices/${props.match.params.id}`, AuthHeaders)
		setInvoice(invoice.data)
	}, [props.match.params.id])

	useEffect(() => {
		fetchInvoice()
	}, [fetchInvoice])

	const renderInvoiceItems = () => {
		const { status, lines } = invoice
		if (status) {
			const columns = [
				{ key: 'description', dataIndex: 'description', title: 'Description' },
				{ key: 'amount', dataIndex: 'amount', title: 'Amount', align: 'right', render: amount => getCurrencySymbol(invoice.currency) + (amount / 100).toLocaleString() },
			]
			return (
				<Table dataSource={lines.reverse()} columns={columns} rowKey="id" pagination={lines.length > 10 && 10} footer={(lines) => {
					let total = (invoice.total / 100).toLocaleString()
					return (
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<strong>Total</strong>
							<span>{getCurrencySymbol(invoice.currency) + total}</span>
						</div>
					)
				}} />
			)
		}
	}
	const currencyOptions = [
		{ key: 'usd', label: 'US Dollar' },
		{ key: 'eur', label: 'Euro' },
		{ key: 'aud', label: 'Australian Dollar' },
		{ key: 'gbp', label: 'British Pound' }
	]
	const { _customer } = invoice
	const currency = currencyOptions.find(option => option.key === invoice.currency)

	return (
		<div className="dashboard-item">
			{invoice && invoice._customer ? 
				<div className="box">
					<div className="section-title">
						<h1>
							Invoice #{invoice.number}
							{invoice.status === 'paid' ? <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginLeft: '.5rem' }} /> : ''}
						</h1>
						<div className="section-actions">
							<Button type={!editMode ? 'link' : 'primary'} onClick={() => setEditMode(!editMode)}>{!editMode ? 'Edit invoice' : 'Save invoice'}</Button>
						</div>
					</div>

					<Divider />
					<div className="invoice-customer">
						<h2>Customer</h2>
						<div><strong>{_customer.name}</strong></div>
						<div>{_customer.email}</div>
					</div>
					<Divider />
					<div className="invoice-items">
						<h2>Items</h2>
						{renderInvoiceItems()}
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
					</div>
				</div> : ''}
		</div>
	)
}

export default InvoiceDetails