import React, { useState } from 'react'
import CreateCustomer from './CreateCustomer'
import CustomerList from './CustomerList'

const Customers = () => {
	const [modal, setModal] = useState(false)

	const toggleAddCustomerModal = () => {
		setModal(!modal)
	}

	return (
		<div className="dashboard-item">
			<CreateCustomer modal={modal} toggleModal={toggleAddCustomerModal} />
			<CustomerList toggleModal={toggleAddCustomerModal} />
		</div>
	)
}

export default Customers