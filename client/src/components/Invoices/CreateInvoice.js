import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import InvoiceForm from './InvoiceForm'
import InvoiceFormReview from './InvoiceFormReview'

class CreateInvoice extends Component {

	state = {
		showInvoiceReview: false
	}

	renderContent() {
		if (this.state.showInvoiceReview) {
			return <InvoiceFormReview onCancel={() => this.setState({ showInvoiceReview: false })} />
		}
		return <InvoiceForm onInvoiceSubmit={() => this.setState({ showInvoiceReview: true })} />
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		) 
	}
}

export default reduxForm({
	form: 'invoiceForm'
})(CreateInvoice)