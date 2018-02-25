import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/Signup/SignupForm'
import Home from './components/Home/Home'
import Catch from './pages/Catch'
import TopNav from './components/TopNav'


class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		const loggedInStatus = this.state.loggedIn;
		let toDisplay;
		
		//If user is logged in the component that is displayed is their "Hompage". Otherwise, the login screen. 
		if(loggedInStatus){
			toDisplay = <Home user={this.state.user} />
		}else{
			toDisplay = <LoginForm _login={this._login} _googleSignin={this._googleSignin}/>
		}

		return (
			<div className="App">

				{/* {Nav */}
				<TopNav _logout={this._logout} loggedIn={this.state.loggedIn} user={this.state.user}/>

				{/* {This is just here for reference} */}
				<h1>This is the main App component</h1>
				
				{/*  ROUTES */}
				<Route exact path="/" render={() => toDisplay} />
				<Route exact path="/login" 
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route exact path="/signup" component={SignupForm} />

				{/* Route for catch */}
				<Route exact path="/catch" component={Catch} />
			</div>
		)
	}
}

export default App
