import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import 'antd/dist/antd.css' 
import './Ant.scss' 

import Landing from './Landing'
import Login from './Auth/Login'
import Register from './Auth/Register'
import VerifyEmail from './Auth/VerifyEmail'
import Dashboard from './Dashboard'

class App extends Component {

	render() {
		return (
			<BrowserRouter>
				<Route exact path="/" component={Landing} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/verify" component={VerifyEmail} />
				<Route path="/dashboard" component={Dashboard} />
			</BrowserRouter>
		)
	}
}

const mapStateToProps = state => {
	return { user: state.user }
}

export default connect(mapStateToProps, actions)(App)