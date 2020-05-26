import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

const InvoiceFormReview = ({ onCancel, formValues, createInvoice }) => {

	return (
		<div className="dashboard-item">
			<div className="box">
				<h2>Please review your invoice before you send it.</h2>
				<div>
					<div>Customer: {formValues.invoiceCustomer}</div>	
					<div>Due date: {formValues.daysUntilDue}</div>
					<div>Currency: {formValues.currency}</div>
					Summary: <br />
					{formValues.invoiceItems.map((item, index) => (
						<div key={index}>{item.description} — {item.amount}</div>
					))}
				</div>
				<button onClick={onCancel}>Go back</button>
				<button onClick={() => createInvoice(formValues)}>Send invoice</button>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return { formValues: state.form.invoiceForm.values }
}

export default connect(mapStateToProps, actions)(InvoiceFormReview)