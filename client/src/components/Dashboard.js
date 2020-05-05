import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Dashboard extends Component {
	
	render() {
		return (
			<div>
				Hello, {this.props.user.firstName}
				<button onClick={this.props.createCustomer}>Create customer</button>
			</div>
		)
	}
}

const mapStateToProps = ({ user }) => {
	return { user }
}

export default connect(mapStateToProps, actions)(Dashboard)