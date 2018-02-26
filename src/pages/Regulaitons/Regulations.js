import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import {Dropdown, Button, NavItem, Row, Col} from "react-materialize";
class Regulations extends Component {
  state = {
    regulations: []
  };

  componentDidMount() {
    this.loadRegulations();
    // let tempRegs = nyScraper();
    // API.saveRegulation(tempRegs[0])
    //   .then(res => this.loadRegulation())
    //   .regulations(err => console.log(err));
  }

  loadRegulations = () => {
    API.getRegulation()
      .then(res =>
        this.setState({ regulations: res.data })
      )
      .catch(err => console.log(err));
  };

  // deleteCatch = id => {
  //   API.deleteCatch(id)
  //     .then(res => this.loadCatch())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveCatch({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadCatch())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      // <p> This is just a test </p>
      <div>
        <Row>
          <Col className="s12">
            <Dropdown trigger={
                <Button>States</Button>
              }>
              <NavItem>New York</NavItem>
              <NavItem>New Jersey</NavItem>
              <NavItem>Pennsylvania</NavItem>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className="s12">
            <Dropdown trigger={
                <Button large >---------------------Fish-------------------------</Button>
              }>
              {this.state.regulations.map(regulation => <NavItem>{regulation.fishName}</NavItem>)}
            </Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Regulations;
