import React from 'react'
import { Form } from 'antd'

const FormItem = Form.Item

const makeAntField = Component => ({ input, meta, children, label, ...rest }) => {
	const hasError = meta.touched && meta.invalid
	return (
		<FormItem label={label} validateStatus={hasError ? 'error' : 'success'} help={hasError && meta.error}>
			<Component {...input} {...rest} children={children} value={input.value ? input.value : undefined} onBlur={() => {}} />
		</FormItem>
	)
}

export default makeAntField