import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import AuthHeaders from '../../../utils/AuthHeaders'

const CustomerDetails = props => {
	const [customer, setCustomer] = useState({})

	const fetchCustomer = useCallback(async () => {
		const customer = await axios.get(`http://localhost:5000/api/customers/${props.match.params.id}`, AuthHeaders)
		setCustomer(customer.data)
	}, [props.match.params.id])

	useEffect(() => {
		fetchCustomer()
	}, [fetchCustomer])

	const renderCustomer = () => {
		if (customer) {
			return (
				<div>{customer.name}</div>
			)
		}
	}

	return (
		<div>{renderCustomer()}</div>
	)
}

export default CustomerDetails