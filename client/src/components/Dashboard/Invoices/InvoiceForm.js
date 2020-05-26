import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Row, Col, Divider, Form, Select, Input, Button } from 'antd'
import makeAntField from '../../../utils/makeAntField'

const { Option } = Select

const InputField = makeAntField(Input)
const SelectField = makeAntField(Select)

class InvoiceForm extends Component {

	renderCurrencies() {
		const currencyOptions = [
			{ key: 'usd', label: 'US Dollar' },
			{ key: 'eur', label: 'Euro' },
			{ key: 'aud', label: 'Australian Dollar' },
			{ key: 'gbp', label: 'British Pound' }
		]
		return (
			<Field name="currency" label="Currency" rules={[{ required: true }]} component={SelectField} placeholder="Select a currency" style={{ width: '35%' }}>
				{currencyOptions.map(({ key, label }) => {
					return (
						<Option key={key} value={key}>{`${key.toUpperCase()} - ${label}`}</Option>
					)
				})}
			</Field>
		)
	}

	renderCustomerSelect() {
		const options = this.props.customers ? this.props.customers : []
		return (
			<Field name="customer" component={SelectField} showSearch rules={[{ required: true }]} placeholder="Select a customer" style={{ width: '35%' }} filterOption={(input, option) => {
				const name = option.children[0].props.children.toLowerCase()
				const email = option.children[2].toLowerCase()
				return name.indexOf(input.toLowerCase()) >= 0 || email.indexOf(input.toLowerCase()) >= 0
			}}>
				{options.map(customer => (
					<Option value={`${customer._id}, ${customer.stripeId}`} key={customer._id}><strong>{customer.name}</strong> {customer.email}</Option>
				))}
			</Field>
		)
	}

	renderItems = ({ fields, meta: { error, submitFailed } }) => (
		<div>
			{fields.map((item, index) => (
				<Row key={index} gutter={16}>
					<Col span={18}>
						<Field name={`${item}.description`} type="text" component={InputField} label={index === 0 ? 'Description' : undefined} />
					</Col>
					<Col span={6}>
						<Field name={`${item}.amount`} type="text" component={InputField} label={index === 0 ? 'Amount' : undefined} />
					</Col>
				</Row>
			))}
			<Button onClick={() => fields.push({})}>Add item</Button>
		</div>
	)

	renderItemFields() {
		return (
			<FieldArray name="invoiceItems" component={this.renderItems} />
		)
	}

	render() {
		this.props.fetchCustomers()
		const { handleSubmit } = this.props
		return (
			<Form layout="vertical" id="createInvoice" className="box" onFinish={handleSubmit(this.props.onInvoiceSubmit)}>
				<h1>Create invoice</h1>
				<Divider />
				<div className="invoice-customer">
					<h2>Customer</h2>
					{this.renderCustomerSelect()}
				</div>
				<Divider />
				<div className="invoice-items">
					<h2>Items</h2>
					{this.renderItemFields()}
				</div>
				<Divider />
				<div className="invoice-details">
					<h2>Payment details</h2>
					{this.renderCurrencies()}
					<Field name="daysUntilDue" component={InputField} label="Payment due" addonAfter="days after invoice is sent" style={{ width: '320px' }} />
				</div>
				<Button form="createInvoice" type="primary" htmlType="submit">Create invoice</Button>
			</Form>
		)
	}
}

const mapStateToProps = ({ customers }) => {
	return { customers }
}

InvoiceForm = reduxForm({
	form: 'invoiceForm',
	initialValues: {
		daysUntilDue: 7
	},
	destroyOnUnmount: false
})(InvoiceForm)

export default connect(mapStateToProps, actions)(InvoiceForm)