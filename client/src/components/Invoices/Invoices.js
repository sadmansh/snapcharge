import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import CreateInvoice from './CreateInvoice'
import InvoiceList from './InvoiceList'

class Invoices extends Component {
	render() {
		return (
			<div>
				<CreateInvoice />
				<InvoiceList />
			</div>
		)
	}
}

export default connect(null, actions)(Invoices)