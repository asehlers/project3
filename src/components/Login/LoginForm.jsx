import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
import {Card, CardTitle, Row,Col, Input} from 'react-materialize'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		// this.googleSignin = this.googleSignin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
			<Row>	
				<Col l= {3}>
				</Col>
				<Col l={6}>
				<Card header={<CardTitle reveal image={"https://lorempixel.com/800/400/nature/"} waves='light'/>}
					title="Log In"
					reveal={
						<div className = "container">	
							<Row>
							<Input 
								type="email" 
								label="Username"
								name="username"
								value={this.state.username}
								onChange={this.handleChange} 
								s={12} />
							<Input 
								name= "password" 
								type="password" 
								label="password"
								onChange={this.handleChange}
								value={this.state.password}
								s={12} />
						</Row>
						<Row>
							<button onClick={this.handleSubmit}>Login</button>
						</Row>
						<Row>
							<a href="/auth/google">
								{/* <GoogleButton /> */}
								<img src={googleButton} alt="sign into Google Button" />
							</a>
						</Row>
					</div>
					}>
				</Card>
				</Col>
				<Col l= {3}>
				</Col>
			</Row>
			)
		}
	}
}

export default LoginForm
