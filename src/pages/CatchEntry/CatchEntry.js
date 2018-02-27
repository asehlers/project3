import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import {Collapsible, CollapsibleItem, Dropdown, Button, NavItem, Row, Col, Input} from "react-materialize";

class CatchEntry extends Component {
  state = {
    image: "",
    fishName: "",
    length: 0,
    weight: 0,
    bait: "",
    equipment: "",
    notes: "",
    amountCaught: 0,
    location: "",
		time: "",
		userid: ""
};

  componentDidMount() {
		console.log(this.props.user)
    this.setState({
			location: "My basement",
			userid: this.props.user._id
    });
    // this.loadCatch();
    // let tempRegs = nyScraper();
    // API.saveRegulation(tempRegs[0])
    //   .then(res => this.loadRegulation())
    //   .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("attempting submit");
      API.saveCatch({
        catchDetails: [ {
          image: this.state.image,
          fishName: this.state.fishName,
          length: this.state.length,
          weight: this.state.weight,
          bait: this.state.bait,
          equipment: this.state.equipment,
          notes: this.state.notes
        }],
        amountCaught: this.state.amountCaught,
        location: this.state.location,
				time: this.state.time,
				userid: this.state.userid
      })
        .then(res => this.loadCatch())
        .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
      <Row>
				<Col s={10} offset="s1">
			  <Input
					name="amountCaught"
					type="number" 
					label="Amount Caught(required)"
					value={this.state.amountCaught}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
					name="time" 
					label="Time(Morning, Afternoon, Evening)"
					value={this.state.time}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
					name="location" 
          label="Location, will auto enter"
          disabled
					value={this.state.location}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
					name="image"
					label="Image(web address)"
					value={this.state.image}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
					name="fishName"
					label="Fish Name"
					value={this.state.fishName}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
          name="length"
          type="number"
					label="Length(in)"
					value={this.state.length}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
          name="weight"
          type="number"
					label="Weight(lbs)"
					value={this.state.weight}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
          name="bait"
					label="Bait"
					value={this.state.bait}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
          name="equipment"
					label="Equipment"
					value={this.state.equipment}
					onChange={this.handleInputChange} 
					s={12} 
				/>
        <Input
          name="notes"
					label="Notes"
					value={this.state.notes}
					onChange={this.handleInputChange} 
					s={12} 
				/>
				{/* <Input 
					name= "password" 
					type="password" 
					label="Password"
					onChange={this.handleInputChange}
					value={this.state.password}
					s={12} 
				/>
				<Input 
					name= "confirmPassword" 
					type="password" 
					label="Confirm Password"
					onChange={this.handleInputChange}
					value={this.state.confirmPassword}
					s={12} 
				/> */}
				</Col>
			</Row>
			<Row>
				<Button onClick={this.handleFormSubmit}>Enter Catch</Button>
			</Row>
      </div>
    );
  }
}

export default CatchEntry;
