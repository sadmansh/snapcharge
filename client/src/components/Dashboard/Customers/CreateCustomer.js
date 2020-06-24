import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../../../actions'
import { Form, Input, Modal, Button, message } from 'antd'

const CreateCustomer = props => {
	const [buttonLoading, setButtonLoading] = useState(false)

	const dispatch = useDispatch()

	const handleSubmit = customer => {
		setButtonLoading(true)
		if (customer) dispatch(actions.createCustomer(customer)).then(res => {
			setButtonLoading(false)
			props.toggleModal()
			message.success('Customer created!')
		})
	}

	return (
		<Modal visible={props.modal} title="Add customer" onCancel={props.toggleModal} footer={[
			<Button key="cancel" onClick={props.toggleModal}>Cancel</Button>,
			<Button key="submit" form="createCustomer" type="primary" htmlType="submit" loading={buttonLoading}>Add customer</Button>
		]}>
			<Form id="createCustomer" onFinish={handleSubmit} layout="vertical" size="large">
				<Form.Item name="name" label="Name" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="email" label="Email" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default CreateCustomer