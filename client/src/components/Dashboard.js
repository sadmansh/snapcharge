import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import * as actions from '../actions'
import { Layout } from 'antd'
import './Dashboard.scss'

import DashboardNavigation from './DashboardNavigation'
import Customers from './Customers/Customers'
import CustomerDetails from './Customers/CustomerDetails'
import Invoices from './Invoices/Invoices'
import CreateInvoice from './Invoices/CreateInvoice'

const { Content, Sider } = Layout

class Dashboard extends Component {
	
	render() {
		return (
			<div style={{ background: '#e6eaef' }}>
				<Layout style={{ background: 'transparent', maxWidth: '1360px', marginLeft: 'auto', marginRight: 'auto' }}>
					<Sider style={{ paddingTop: '2rem', height: '100vh', background: 'transparent' }}>
						<DashboardNavigation />						
					</Sider>
					<Content style={{ padding: '4rem' }}>
						<div className="dashboard-content">
							<Route exact path="/dashboard/customers" component={Customers} />
							<Route path="/dashboard/customers/:stripeId" component={CustomerDetails} />
							<Route exact path="/dashboard/invoices" component={Invoices} />
							<Route exact path="/dashboard/invoices/create" component={CreateInvoice} />
						</div>
					</Content>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => {
	return { user }
}

export default connect(mapStateToProps, actions)(Dashboard)