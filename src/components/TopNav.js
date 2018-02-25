import React from 'react';
import { NavLink } from 'react-router-dom';
import {Navbar, NavItem} from 'react-materialize';
import Header from './Header';

//Top Navigation
const TopNav  = props => {
	if (props.loggedIn) {
		return (
			<Navbar brand='FinTastic' className='green accent-4' right fixed>
				<li><Header user={props.user}/></li>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='#' onClick={props._logout}>Logout</NavLink></li>
      </Navbar>
		)
	} else {
		return (
			<Navbar brand='FinTastic' className='green accent-4' right fixed>
				<li><Header user={props.user}/></li>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/signup'>Sign Up</NavLink></li>
        <li><NavLink to='/login'>Log In</NavLink></li>
      </Navbar>
		)
	}
}

export default TopNav;