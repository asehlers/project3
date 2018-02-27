import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {Row, Col, Input, Button} from 'react-materialize'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			usernameError:'',
			password: '',
			passwordError: '',
			confirmPassword: '',
			confirmPasswordError: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	
	//validation helper to determine if input has a number
	hasNumbers(t){
		const regex = /\d/g;
		return regex.test(t);
	} 

	//validation helper to determine if username is an email.
	isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	

	//validates client side inputs
	validation(name, value){

		//checks to see if email is valid format.
		if(name === "username" && (value.length < 1) ){
			this.setState({
				usernameError: ""
			})
		}else if(name === "username" && this.isEmail(value)){
			this.setState({
				usernameError: ""
			})
		}else if(name === "username" && !this.isEmail(value)){
			this.setState({
				usernameError: "The username must be an e-mail."
			})
		}
		//handles password validtion. check to see if password had at least 5 char and a number
		if(name === "password" && value.length < 5){
			this.setState({
				passwordError: "Password must be at least 5 characters long."
			})
		}else if(name === "password" && !(this.hasNumbers(value))){
			this.setState({
				passwordError: "Password must contain a number."
			})
		}else{
			this.setState({
				passwordError: ""
			})
		}

		//checks to make sure confirmed password is the same as password
		if(name === "confirmPassword"){
			if(value === this.state.password){
				this.setState({
					confirmPasswordError: ""
				})
			}else{
				this.setState({
					confirmPasswordError: "Password does not match."
				})
			}
		}

	}


	handleChange(event) {
		this.validation(event.target.name,event.target.value)
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
						error = {this.state.usernameError}
						s={12} 
					/>
					<Input 
						name= "password" 
						type="password" 
						label="Password"
						onChange={this.handleChange}
						value={this.state.password}
						error = {this.state.passwordError}
						s={12} 
					/>
					<Input 
						name= "confirmPassword" 
						type="password" 
						label="Confirm Password"
						onChange={this.handleChange}
						value={this.state.confirmPassword}
						error ={this.state.confirmPasswordError}
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
