import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class CreateInvoice extends Component {
	constructor(props) {
		super(props)

		this.state = {
			customerId: '',
			currency: '',
			dueDate: '',
			invoiceItem: []
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const invoice = this.state
		console.log(invoice)
		if (invoice) this.props.createInvoice(invoice)
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="customerId" placeholder="Customer ID" value={this.state.customerId} onChange={this.handleChange} />
					<input type="text" name="currency" placeholder="Currency" value={this.state.currency} onChange={this.handleChange} />
					<input type="date" name="dueDate" placeholder="Due date" value={this.state.dueDate} onChange={this.handleChange} />
					<input type="text" name="invoiceItem" placeholder="Invoice item" value={this.state.invoiceItem} onChange={this.handleChange} />
					<button type="submit">Create invoice</button>
				</form>
			</div>
		) 
	}
}

export default connect(null, actions)(CreateInvoice)