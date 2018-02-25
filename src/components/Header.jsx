import React from 'react'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
		Greeting = 'Hello visitor'
	} else if (props.user.firstName) {
		Greeting = `Welcome back, ${props.user.firstName}`
	} else if (props.user.local.username) {
		Greeting = `Welcome back, ${props.user.local.username}`
	}
	return (
			<p className = "navUser">{Greeting}</p>
	)
}

export default Header;
