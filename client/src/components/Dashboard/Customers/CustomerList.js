import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../actions'
import { Table, Button, Row, Col } from 'antd'
import moment from 'moment'

class CustomerList extends Component {
	
	componentDidMount() {
		this.props.fetchCustomers()
	}

	renderDate = (timestamp) => {
		if (moment.unix(timestamp).year() === moment().year()) return moment.unix(timestamp).format('MMM D, h:mm A')
		return moment.unix(timestamp).format('MMM D, YYYY, h:mm A')
	}

	renderCustomers() {
		const columns = [
			{ key: 'name', dataIndex: 'name', title: 'Name' },
			{ key: 'email', dataIndex: 'email', title: 'Email' },
			{ key: 'created', dataIndex: 'created', title: 'Created', render: timestamp => this.renderDate(timestamp) },
		]
		
		if (this.props.customers) {
			return (
				<Table dataSource={this.props.customers} columns={columns} rowKey="_id" pagination={{ defaultPageSize: 10 }} rowSelection={{ type: 'checkbox' }} onRow={(record, rowIndex) => {
					return {
						onClick: event => {
							this.props.history.push(`customers/${record.stripeId}`)
						}
					}
				}} />
			)
		}
	}

	render() {
		return (
			<div className="customers-list">
				<Row className="box">
					<Col span={20}>
						<h2 style={{ margin: 0 }}>All customers</h2>
					</Col>
					<Col span={4} style={{ textAlign: 'right' }}>
						<Button type="primary" onClick={this.props.toggleModal}>Add customer</Button>
					</Col>
				</Row>
				{this.renderCustomers()}
			</div>
		)
	}
}

const mapStateToProps = ({ customers }) => {
	return { customers }
}

export default connect(mapStateToProps, actions)(withRouter(CustomerList))