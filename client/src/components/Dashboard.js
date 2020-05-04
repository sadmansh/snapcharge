import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Dashboard extends Component {

	componentDidMount() {
		console.log(this.props.user)
	}
	
	render() {
		return (
			<div>
				This is the dashboard!
				<button onClick={this.props.createCustomer}>Create customer</button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { user: state.user }
}

export default connect(mapStateToProps, actions)(Dashboard)