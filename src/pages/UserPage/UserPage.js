import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import {Collapsible, CollapsibleItem, Dropdown, Button, NavItem, Row, Col} from "react-materialize";
import Catch from "../../components/Catch";

class UserPage extends Component {
  state = {
    user : "",
    catches: []
  };

  componentDidMount() {
    this.setState({
      user: this.props.user
    });
    this.loadCatch();
    // let tempRegs = nyScraper();
    // API.saveRegulation(tempRegs[0])
    //   .then(res => this.loadRegulation())
    //   .catch(err => console.log(err));
  }

  loadCatch = () => {
    API.getCatch()
      .then(res =>
        this.setState({ catches: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteCatch = id => {
    API.deleteCatch(id)
      .then(res => this.loadCatch())
      .catch(err => console.log(err));
  };

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
      <Row>
        <Col s={10} m={6} offset="s1 m3 l3">
          <Collapsible accordion>
            {this.state.catches.map(onecatch => <Catch catch={onecatch}> </Catch>)}
          </Collapsible>
        </Col>
      </Row>
    );
  }
}

export default UserPage;
