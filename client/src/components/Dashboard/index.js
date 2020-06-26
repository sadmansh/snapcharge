import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import './Dashboard.scss'

import DashboardNavigation from './DashboardNavigation'
import DashboardView from './DashboardView'
import Customers from './Customers/Customers'
import Payouts from './Payouts/Payouts'
import CustomerDetails from './Customers/CustomerDetails'
import Invoices from './Invoices/Invoices'
import InvoiceDetails from './Invoices/InvoiceDetails'
import CreateInvoice from './Invoices/CreateInvoice'

const { Content, Sider } = Layout

const Dashboard = () => {
	return (
		<div style={{ background: '#e6eaef' }}>
			<Layout style={{ background: 'transparent', maxWidth: '1360px', marginLeft: 'auto', marginRight: 'auto' }}>
				<Sider style={{ paddingTop: '2rem', height: '100vh', background: 'transparent' }}>
					<DashboardNavigation />						
				</Sider>
				<Content style={{ padding: '4rem' }}>
					<div className="dashboard-content">
						<Switch>
							<Route exact path="/dashboard" component={DashboardView} />
							<Route exact path="/dashboard/payouts" component={Payouts} />
							<Route exact path="/dashboard/customers" component={Customers} />
							<Route path="/dashboard/customers/:id" component={CustomerDetails} />
							<Route exact path="/dashboard/invoices" component={Invoices} />
							<Route exact path="/dashboard/invoices/create" component={CreateInvoice} />
							<Route path="/dashboard/invoices/:id" component={InvoiceDetails} />
						</Switch>
					</div>
				</Content>
			</Layout>
		</div>
	)
}

export default Dashboard