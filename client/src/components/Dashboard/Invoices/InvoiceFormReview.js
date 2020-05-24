import React from 'react'
import { connect } from 'react-redux'
import formFields from './formFields'
import * as actions from '../../../actions'

const InvoiceFormReview = ({ onCancel, formValues, createInvoice }) => {

	const reviewFields = formFields.map(({ label, name }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		)
	})

	return (
		<div>
			<h2>Please review your invoice before you send it.</h2>
			<div>
				{reviewFields}
			</div>
			<button onClick={onCancel}>Go back</button>
			<button onClick={() => createInvoice(formValues)}>Send invoice</button>
		</div>
	)
}

const mapStateToProps = state => {
	return { formValues: state.form.invoiceForm.values }
}

export default connect(mapStateToProps, actions)(InvoiceFormReview)