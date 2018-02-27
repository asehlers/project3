import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/Signup/SignupForm'
import Home from './components/Home/Home'
import UserPage from './pages/UserPage'
import TopNav from './components/TopNav'
import Regulations from "./pages/Regulations"
import CatchEntry from "./pages/CatchEntry"
import Location from "./components/Location/Location"


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
		return (
			<div className="App">
					{/* Navbar that displays on every page */}
				<TopNav _logout={this._logout} loggedIn={this.state.loggedIn} user={this.state.user}/>		
				
					{/* login route */}
				<Route exact path="/login" 
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>

					{/* signup route */}
				<Route exact path="/signup" component={SignupForm} />

				{/* home route. This will display login if not authenticated */}
				<Route exact path="/" render={() => (
					this.state.loggedIn ? (
						<Home user={this.state.user} />
					) : (
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>
					)
				)}/>

					{/* Route for UserPage This will display login if not authenticated*/}
				<Route exact path="/user" render={() => (
					this.state.loggedIn ? (
						<UserPage user={this.state.user}/>
					) : (
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>
					)
				)}/>

				{/* location page to add catch */}
				<Route exact path="/catch/add" render={() => (
					this.state.loggedIn ? (
						<Location />
					) : (
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>
					)
				)}/>

				{/* Route for regulations. This will display login if not authenticated*/}
				<Route exact path="/regulations" render={() => (
					this.state.loggedIn ? (
						<Regulations />
					) : (
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>
					)
				)}/>

				<Route exact path="/catchentry" render={() => (
					this.state.loggedIn ? (
						<CatchEntry user={this.state.user}/>
					) : (
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>
					)
				)}/>
			</div>
		)
	}
}

export default App
