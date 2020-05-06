import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions'

class DashboardNavigation extends Component {
	render() {
		return (
			<nav>
				<Link to="/dashboard/customers">Customers</Link>
				<Link to="/dashboard/invoices">Invoices</Link>
			</nav>
		)
	}
}

export default connect(null, actions)(DashboardNavigation)