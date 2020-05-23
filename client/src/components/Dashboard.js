import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import * as actions from '../actions'

import DashboardNavigation from './DashboardNavigation'
import Customers from './Customers/Customers'
import CustomerDetails from './Customers/CustomerDetails'
import Invoices from './Invoices/Invoices'
import CreateInvoice from './Invoices/CreateInvoice'

class Dashboard extends Component {
	
	render() {
		return (
			<div>
				<DashboardNavigation />
				<h1>Hello, {this.props.user.firstName}</h1>
				<Route exact path="/dashboard/customers" component={Customers} />
				<Route path="/dashboard/customers/:stripeId" component={CustomerDetails} />
				<Route exact path="/dashboard/invoices" component={Invoices} />
				<Route exact path="/dashboard/invoices/create" component={CreateInvoice} />
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => {
	return { user }
}

export default connect(mapStateToProps, actions)(Dashboard)