import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import InvoiceField from './InvoiceField'
import formFields from './formFields'

class InvoiceForm extends Component {

	renderFields() {
		return formFields.map(({ label, name }) => {
			return (
				<Field key={name} component={InvoiceField} type="text" label={label} name={name} />
			)
		})
	}

	render() {
		return (
			<div className="invoice-form">
				<form onSubmit={this.props.handleSubmit(this.props.onInvoiceSubmit)}>
					{this.renderFields()}
					<Link to="/dashboard/invoices">Cancel</Link>
					<button type="submit">Next</button>
				</form>
			</div>
		)
	}
}

const validate = values => {
	const errors = {}
	formFields.forEach(({ name }) => {
		if (!values[name]) errors[name] = 'You must provide a value'
	})
	return errors
}

export default reduxForm({
	validate,
	form: 'invoiceForm',
	destroyOnUnmount: false
})(InvoiceForm)