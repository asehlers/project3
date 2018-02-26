import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import {Dropdown, Button, NavItem, Row, Col, Table} from "react-materialize";

class Regulations extends Component {
  state = {
    regulations: [],
    visibleRegulations: [],
    state: "",
    fishName: "",
    regulationOutput: []
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
        this.setState({ 
          regulations: res.data,
          visibleRegulations: res.data
         })
      )
      .catch(err => console.log(err));
  };

  // deleteCatch = id => {
  //   API.deleteCatch(id)
  //     .then(res => this.loadCatch())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    event.preventDefault();
    console.log("event.target", event.target);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleStateChange = event => {
    event.preventDefault();
    console.log("event.target", event.target.text);
    const value = event.target.text;
    const visibleRegulations = this.state.regulations.filter(regulation => regulation.state === value);
    this.setState({
      state: value,
      visibleRegulations: visibleRegulations
    });
  };

  handleFishChange = event => {
    event.preventDefault();
    console.log("event.target", event.target.text);
    const value = event.target.text;
    const regulationOutput = this.state.visibleRegulations.filter(regulation => regulation.fishName === value);
    this.setState({
      fishName: value,
      regulationOutput: regulationOutput
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
              <NavItem onClick={this.handleStateChange}>New York</NavItem>
              <NavItem divider />
              <NavItem onClick={this.handleStateChange}>New Jersey</NavItem>
              <NavItem divider />
              <NavItem onClick={this.handleStateChange}>Pennsylvania</NavItem>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className="s12">
            <Dropdown trigger={
                <Button large >---------------------Fish-------------------------</Button>
              }>
              {this.state.visibleRegulations.map(regulation => {
                return(
                  <div>
                  <NavItem divider />
                  <NavItem onClick={this.handleFishChange}>{regulation.fishName}</NavItem>
                  </div>
                );
              })}
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col s={1}>
          </Col>
          <Col  className="s10">
            <Table>
              <thead>
                <tr>
                  <th data-field="fishName">Name</th>
                  <th data-field="season">Season</th>
                  <th data-field="length">Length</th>
                  <th data-field="limit">Limit</th>
                </tr>
              </thead>
              <tbody>
              {this.state.regulationOutput.map(regulation => {
                    return(
                      <tr>
                        <td>{regulation.fishName}</td>
                        <td>{regulation.season}</td>
                        <td>{regulation.length}</td>
                        <td>{regulation.limit}</td>
                    </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Regulations;
