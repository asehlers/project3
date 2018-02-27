import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {Row, Col, Input, Button} from 'react-materialize'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
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
		// TODO - validate!
		axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200){
					this.setState({
						redirectTo: '/'
					})
				}
			})
			.catch(error => {
				console.log(error.response.data)})
			}


			
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className = "container SignupForm">	
				<Row>
					<Input
						name="username"
						type="email" 
						label="Username"
						value={this.state.username}
						onChange={this.handleChange} 
						s={12} 
					/>
					<Input 
						name= "password" 
						type="password" 
						label="Password"
						onChange={this.handleChange}
						value={this.state.password}
						s={12} 
					/>
					<Input 
						name= "confirmPassword" 
						type="password" 
						label="Confirm Password"
						onChange={this.handleChange}
						value={this.state.confirmPassword}
						s={12} 
					/>
				</Row>
				<Row>
					<Button onClick={this.handleSubmit}>Sign Up</Button>
				</Row>
			</div>
		)
	}
}

export default SignupForm;
