import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions'
import { Menu } from 'antd'
import { UserOutlined, ContainerOutlined } from '@ant-design/icons'

class DashboardNavigation extends Component {
	render() {
		return (
			<nav className="dashboard-navigation" style={{ height: '100%' }}>
				<Menu mode="vertical" style={{ height: '100%', padding: '2rem 0', border: 'none', background: 'transparent' }}>
					<Menu.Item key="customers" icon={<UserOutlined />}>
						<Link to="/dashboard/customers">Customers</Link>
					</Menu.Item>
					<Menu.Item key="invoices" icon={<ContainerOutlined />}>
						<Link to="/dashboard/invoices">Invoices</Link>
					</Menu.Item>
				</Menu>
			</nav>
		)
	}
}

export default connect(null, actions)(DashboardNavigation)