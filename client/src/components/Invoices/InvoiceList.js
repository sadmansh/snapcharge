import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Table, Button, Row, Col } from 'antd'
import moment from 'moment'

class InvoiceList extends Component {
	
	componentDidMount() {
		this.props.fetchInvoices()
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

	renderInvoices() {
		const columns = [
			{ key: 'amount', dataIndex: 'total', title: 'Amount', render: amount => <strong>{amount}</strong> },
			{ key: 'status', dataIndex: 'status', title: 'Status', render: status => status.charAt(0).toUpperCase() + status.slice(1) },
			{ key: 'number', dataIndex: 'number', title: 'Invoice Number' },
			{ key: 'customer', dataIndex: ['customer', 'name'], title: 'Customer' },
			{ key: 'due', dataIndex: 'dueDate', title: 'Due', render: timestamp => this.renderDate(timestamp, false) },
			{ key: 'created', dataIndex: 'created', title: 'Created', render: timestamp => this.renderDate(timestamp) },
		]

		if (this.props.invoices) {
			return (
				<Table dataSource={this.props.invoices} columns={columns} rowKey="_id" pagination={{ defaultPageSize: 10 }} onRow={(record, rowIndex) => {
					return {
						onClick: event => {
							this.props.history.push(`invoices/${record.stripeId}`)
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
						<Button type="primary">Add invoice</Button>
					</Col>
				</Row>
				{this.renderInvoices()}
			</div>
		)
	}
}

const mapStateToProps = ({ invoices }) => {
	return { invoices }
}

export default connect(mapStateToProps, actions)(InvoiceList)