import React from 'react'

export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label htmlFor={input.name}>{label}</label>
			<input {...input} style={{ border: 'none', borderBottom: touched && error ? '2px solid red' : '2px solid grey' }} />
		</div>
	)
}