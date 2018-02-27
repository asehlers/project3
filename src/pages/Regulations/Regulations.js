import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import {Dropdown, Button, NavItem, Row, Col, Table, Input} from "react-materialize";

class Regulations extends Component {
  state = {
    regulations: [],
    visibleRegulations: [],
    nameList: [],
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
    // event.preventDefault();
    console.log("event.target", event.target.value);
    const value = event.target.value;
    const visibleRegulations = this.state.regulations.filter(regulation => regulation.state === value);
    let nameList = visibleRegulations.map(regulation => regulation.fishName);

    nameList = nameList.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });
    this.setState({
      state: value,
      visibleRegulations: visibleRegulations,
      nameList: nameList
    });
  };

  handleFishChange = event => {
    event.preventDefault();
    console.log("event.target", event.target.value);
    const value = event.target.value;
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
          <Col offset="s1" s={10}>
            {/* <Dropdown trigger={
                <Button>States</Button>
              }>
              <NavItem onClick={this.handleStateChange}>New York</NavItem>
              <NavItem divider />
              <NavItem onClick={this.handleStateChange}>New Jersey</NavItem>
              <NavItem divider />
              <NavItem onClick={this.handleStateChange}>Pennsylvania</NavItem>
            </Dropdown> */}
            <Input s={12} offset="1" onChange={this.handleStateChange} type='select' label="Materialize Select" defaultValue='New York'>
              <option value='New York'>New York</option>
              <option value='New Jersey'>New Jersey</option>
              <option value='Pennsylvania'>Pennsylvania</option>
            </Input>
          </Col>
        </Row>
        <Row>
          <Col offset="s1" s={10}>
          {/* <Col className="s12">
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
          </Col> */}
          <Input s={12} onChange={this.handleFishChange} type='select' label="Materialize Select">
            {this.state.nameList.map(name => {
              return(
                  <option value={name}>{name}</option>
                );
              })}
          </Input>
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
                  <th data-field="location">Location</th>
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
                        <td>{regulation.regulationLocation}</td>
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
