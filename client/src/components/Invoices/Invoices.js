import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import InvoiceList from './InvoiceList'

class Invoices extends Component {
	render() {
		return (
			<div className="dashboard-item">
				<InvoiceList />
			</div>
		)
	}
}

export default connect(null, actions)(Invoices)