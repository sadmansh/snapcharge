import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'
import { Table } from 'antd'
import moment from 'moment'

class CustomerList extends Component {
	
	componentDidMount() {
		this.props.fetchCustomers()
	}

	renderCustomers() {
		const columns = [
			{ key: 'name', dataIndex: 'name', title: 'Name' },
			{ key: 'email', dataIndex: 'email', title: 'Email' },
			{ key: 'created', dataIndex: 'created', title: 'Created', render: timestamp => moment.unix(timestamp).format('MMM D, YYYY, h:mm A') },
		]
		
		if (this.props.customers) {
			return (
				<Table dataSource={this.props.customers} columns={columns} rowKey="_id" onRow={(record, rowIndex) => {
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
			<div className="AllCustomers">
				<h2>All customers</h2>
				{this.renderCustomers()}
			</div>
		)
	}
}

const mapStateToProps = ({ customers }) => {
	return { customers }
}

export default connect(mapStateToProps, actions)(withRouter(CustomerList))