import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../actions'
import { Table, Button, Row, Col } from 'antd'
import moment from 'moment'

const CustomerList = props => {
	const dispatch = useDispatch()

	const { customers } = useSelector(state => state)

	useEffect(() => {
		dispatch(actions.fetchCustomers())
	}, [dispatch])

	const renderDate = (timestamp) => {
		if (moment.unix(timestamp).year() === moment().year()) return moment.unix(timestamp).format('MMM D, h:mm A')
		return moment.unix(timestamp).format('MMM D, YYYY, h:mm A')
	}

	const renderCustomers = () => {
		const columns = [
			{ key: 'name', dataIndex: 'name', title: 'Name' },
			{ key: 'email', dataIndex: 'email', title: 'Email' },
			{ key: 'created', dataIndex: 'created', title: 'Created', render: timestamp => renderDate(timestamp) },
		]
		
		if (customers) {
			return (
				<Table dataSource={customers} columns={columns} rowKey="_id" pagination={{ defaultPageSize: 10 }} rowSelection={{ type: 'checkbox' }} onRow={(record, rowIndex) => {
					return {
						onClick: event => {
							props.history.push(`customers/${record._id}`)
						}
					}
				}} />
			)
		}
	}

	return (
		<div className="customers-list">
			<Row className="box">
				<Col span={20}>
					<h2 style={{ margin: 0 }}>All customers</h2>
				</Col>
				<Col span={4} style={{ textAlign: 'right' }}>
					<Button type="primary" onClick={props.toggleModal}>Add customer</Button>
				</Col>
			</Row>
			{renderCustomers()}
		</div>
	)
}

export default withRouter(CustomerList)