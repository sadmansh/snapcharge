import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Form, Input, Select, Modal, Button, message } from 'antd'

const { Option } = Select

class CreateCustomer extends Component {
	state = {
		buttonLoading: false,
		name: '',
		email: '',
		currency: ''
	}

	handleSubmit = (customer) => {
		this.setState({ buttonLoading: true })
		if (customer) this.props.createCustomer(customer).then(res => {
			console.log(res)
			this.setState({ buttonLoading: false, })
			this.props.toggleModal()
			message.success('Customer created')
		})
	}

	render() {

		const currencyOptions = [
			{ key: 'usd', label: 'US Dollar' },
			{ key: 'eur', label: 'Euro' },
			{ key: 'aud', label: 'Australian Dollar' },
			{ key: 'gbp', label: 'British Pound' }
		]

		const { buttonLoading } = this.state
		return (
			<Modal visible={this.props.modal} title="Add customer" onCancel={this.props.toggleModal} footer={[
				<Button key="cancel" onClick={this.props.toggleModal}>Cancel</Button>,
				<Button key="submit" form="createCustomer" type="primary" htmlType="submit" loading={buttonLoading}>Add customer</Button>
			]}>
				<Form id="createCustomer" onFinish={this.handleSubmit} layout="vertical" size="large">
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
				</Form>
			</Modal>
		) 
	}
}

export default connect(null, actions)(CreateCustomer)