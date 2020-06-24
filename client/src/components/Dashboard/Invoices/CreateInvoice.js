import React, { useState } from 'react'
import { reduxForm } from 'redux-form'
import InvoiceForm from './InvoiceForm'
import InvoiceFormReview from './InvoiceFormReview'

const CreateInvoice = () => {
	const [showInvoiceReview, setShowInvoiceReview] = useState(false)

	const renderContent = () => {
		if (showInvoiceReview) {
			return <InvoiceFormReview onCancel={() => setShowInvoiceReview(false)} />
		}
		return <InvoiceForm onInvoiceSubmit={() => setShowInvoiceReview(true)} />
	}

	return (
		<div className="dashboard-item create-invoice">
			{renderContent()}
		</div>
	) 
}

export default reduxForm({
	form: 'invoiceForm'
})(CreateInvoice)