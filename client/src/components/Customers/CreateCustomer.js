import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Form, Input, Select, Button } from 'antd'

const { Option } = Select

class CreateCustomer extends Component {
	state = {
		name: '',
		email: '',
		currency: ''
	}

	handleSubmit = (customer) => {
		if (customer) this.props.createCustomer(customer)
	}

	render() {
		const layout = {
			labelCol: { span: 2},
			wrapperCol: { span: 4 }
		}

		const buttonLayout = {
			wrapperCol: { offset: 2, span: 4 }
		}

		const currencyOptions = [
			{ key: 'usd', label: 'US Dollar' },
			{ key: 'eur', label: 'Euro' },
			{ key: 'aud', label: 'Australian Dollar' },
			{ key: 'gbp', label: 'British Pound' }
		]

		return (
			<div className="CreateCustomer">
				<Form {...layout} onFinish={this.handleSubmit}>
					<Form.Item name="name" label="Name" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="email" label="Email" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="currency" label="Currency" rules={[{ required: true }]}>
						<Select>
							{currencyOptions.map(({ key, label }) => {
								return (
									<Option key={key} value={key}>{`${key.toUpperCase()} - ${label}`}</Option>
								)
							})}
						</Select>
					</Form.Item>
					<Form.Item {...buttonLayout}>
						<Button type="primary" htmlType="submit">Add customer</Button>
					</Form.Item>
				</Form>
			</div>
		) 
	}
}

export default connect(null, actions)(CreateCustomer)