import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import AuthHeaders from '../../../utils/AuthHeaders'
import { Button, Divider, Input, Form } from 'antd'

const CustomerDetails = props => {
	const [customer, setCustomer] = useState({})
	const [editMode, setEditMode] = useState(false)

	const fetchCustomer = useCallback(async () => {
		const res = await axios.get(`http://localhost:5000/api/customers/${props.match.params.id}`, AuthHeaders)
		setCustomer(res.data)
	}, [props.match.params.id])

	useEffect(() => {
		fetchCustomer()
	}, [fetchCustomer])

	const renderCustomer = () => {
		if (customer) {
			return (
				<div className="box">
					<div className="section-title">
						<h1>{customer.name}</h1>
						<div className="section-actions">
							<Button type={!editMode ? 'link' : 'primary'} onClick={() => setEditMode(!editMode)}>{!editMode ? 'Edit customer' : 'Save customer'}</Button>
						</div>
					</div>
					<Divider />
					<div>
						<label htmlFor="email" style={{ marginBottom: '.5rem', display: 'block', fontWeight: 'bold' }}>Email</label>
						<span>{customer.email}</span>
					</div>
				</div>
			)
		}
	}

	return (
		<div className="dashboard-item">{renderCustomer()}</div>
	)
}

export default CustomerDetails