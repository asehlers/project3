import React, { Component } from "react";
import API from "../../../utils/API";
import Search from "../WeatherSearch.js"
import {Dropdown, Button, NavItem, Row, Col, Table, Input, Card} from "react-materialize";


//import {Dropdown, Button, NavItem, Row, Col, Table} from "react-materialize";

class WeatherSearch extends Component {
		state = {
			weatherData: {},
			search: "",
	}	

	componentDidMount() {
		this.searchWeather("Boulder,co");
	}

	searchWeather = query => {
		API.search(query)
			.then(res => this.setState({ result: res.data}))
			.catch(err => console.log(err));
	};

	handleFormSubmit = event => {
		event.preventDefault();
		this.searchWeather(this.state.search)
	};
	

	render() {
		return(
			<Col m={6} s={12}>
				<Card className='blue shadow-2 darken-2' textClassName='white-text' title='Card title' actions={[<a href='#'>This is a link</a>]}>
						I am a very simple card.
				</Card>
			</Col>
		)
	};
};	

	export default WeatherSearch;