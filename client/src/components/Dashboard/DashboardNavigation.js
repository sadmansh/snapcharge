import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { HomeTwoTone, SmileTwoTone, ContainerTwoTone, DollarCircleTwoTone } from '@ant-design/icons'

const DashboardNavigation = () => {
	return (
		<nav className="dashboard-navigation" style={{ height: '100%' }}>
			<Menu mode="vertical" style={{ height: '100%', padding: '2rem 0', border: 'none', background: 'transparent' }}>
				<Menu.Item key="home" icon={<HomeTwoTone />}>
					<Link to="/dashboard">Home</Link>
				</Menu.Item>
				<Menu.Item key="payments" icon={<DollarCircleTwoTone />}>
					<Link to="/dashboard/payouts">Payouts</Link>
				</Menu.Item>
				<Menu.Item key="customers" icon={<SmileTwoTone />}>
					<Link to="/dashboard/customers">Customers</Link>
				</Menu.Item>
				<Menu.Item key="invoices" icon={<ContainerTwoTone />}>
					<Link to="/dashboard/invoices">Invoices</Link>
				</Menu.Item>
			</Menu>
		</nav>
	)
}

export default DashboardNavigation