import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import * as actions from '../actions'

import DashboardNavigation from './DashboardNavigation'
import Customers from './Customers/Customers'
import Invoices from './Invoices/Invoices'

class Dashboard extends Component {
	
	render() {
		return (
			<div>
				<DashboardNavigation />
				<h1>Hello, {this.props.user.firstName}</h1>
				<Route exact path="/dashboard/customers" component={Customers} />
				<Route exact path="/dashboard/invoices" component={Invoices} />
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => {
	return { user }
}

export default connect(mapStateToProps, actions)(Dashboard)