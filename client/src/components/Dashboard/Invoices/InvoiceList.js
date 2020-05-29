import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { withRouter, Link } from 'react-router-dom'
import { Table, Button, Tag, Row, Col } from 'antd'
import moment from 'moment'
import getCurrencySymbol from '../../../utils/getCurrencySymbol'

class InvoiceList extends Component {
	
	componentDidMount() {
		this.props.fetchInvoices()
		this.props.fetchCustomers()
	}

	renderDate = (timestamp, showTime = true) => {
		if (moment.unix(timestamp).year() === moment().year()) {
			if (showTime) return moment.unix(timestamp).format('MMM D, h:mm A')
			return moment.unix(timestamp).format('MMM D')
		} else {
			if (showTime) return moment.unix(timestamp).format('MMM D, YYYY, h:mm A')	
			return moment.unix(timestamp).format('MMM D, YYYY')	
		}
		
	}

	getStatusColor = status => {
		switch (status) {
			case 'open':
				return 'processing'
			case 'paid':
				return 'success'
			case 'uncollectible':
			case 'void':
				return 'warning'
			default:
				return 'default'
		}
	}

	renderInvoices() {
		const columns = [
			{ key: 'amount', dataIndex: 'total', title: 'Amount', render: (amount, record) => <strong>{getCurrencySymbol(record.currency)}{(amount / 100).toFixed(2)}</strong> },
			{ key: 'status', dataIndex: 'status', title: 'Status', render: status => <Tag color={this.getStatusColor(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag> },
			{ key: 'number', dataIndex: 'number', title: 'Invoice Number' },
			{ key: 'customer', dataIndex: '_customer', title: 'Customer', render: _customer => {
				if (this.props.customers) {
					return this.props.customers.find(customer => customer._id === _customer).name
				}
			} },
			{ key: 'due', dataIndex: 'dueDate', title: 'Due', render: timestamp => this.renderDate(timestamp, false) },
			{ key: 'created', dataIndex: 'created', title: 'Created', render: timestamp => this.renderDate(timestamp) },
		]

		if (this.props.invoices) {
			return (
				<Table dataSource={this.props.invoices} columns={columns} rowKey="_id" pagination={{ defaultPageSize: 10 }} onRow={(record, rowIndex) => {
					return {
						onClick: event => {
							this.props.history.push(`invoices/${record._id}`)
						}
					}
				}} />
			)
		}
	}

	render() {
		return (
			<div className="invoices-list">
				<Row className="box">
					<Col span={20}>
						<h2 style={{ margin: 0 }}>All invoices</h2>
					</Col>
					<Col span={4} style={{ textAlign: 'right' }}>
						<Button type="primary"><Link to="invoices/create">Add invoice</Link></Button>
					</Col>
				</Row>
				{this.renderInvoices()}
			</div>
		)
	}
}

const mapStateToProps = ({ invoices, customers }) => {
	return { invoices, customers }
}

export default connect(mapStateToProps, actions)(withRouter(InvoiceList))