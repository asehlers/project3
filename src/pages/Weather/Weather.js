import React, { Component } from "react";
import Weatherdata from "../../utils/weather.js"
import API from "../../utils/API";

//import {Dropdown, Button, NavItem, Row, Col, Table} from "react-materialize";

class Weather extends Component {
	constructor(props) {
		super(props);
		state = {
			error: null,
			isLoaded: false,
			weatherData: [],
			location: "",
		}
	};	

	componentDidMount() {
    fetch("https://api.worldweatheronline.com/premium/v1/weather.ashx?key=c8f3cc1c469643d38f6192528182202&q=Boulder,co&date=today")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            weatherData: result.weatherData
          });
        },
        // Note: it's important to handle error:s here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

// 	loadWeather = () => {
// 		API.getWeather()
// 			.then(res => 
// 				this.setState({
// 					weatherData: res.data,
// 					visibleWeather: res.data
// 				})
// 				).catch(err => console.log(err));
// 	}
// };

render() {
	return (
		<div>
			
		</div>
		)
}