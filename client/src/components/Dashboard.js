import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Dashboard extends Component {

	componentDidMount() {
		this.props.getDashboard()
		console.log(this.props.user)
	}
	
	render() {
		return (
			<div>
				This is the dashboard!
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { user: state.user }
}

export default connect(mapStateToProps, actions)(Dashboard)