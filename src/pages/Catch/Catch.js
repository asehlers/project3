import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import nyScraper from "../../scraper/nyScraper.js";

class Catch extends Component {
  state = {
    catches: []
  };

  componentDidMount() {
    this.loadCatch();
    // let tempRegs = nyScraper();
    // API.saveRegulation(tempRegs[0])
    //   .then(res => this.loadRegulation())
    //   .catch(err => console.log(err));
  }

  loadCatch = () => {
    API.getCatch()
      .then(res =>
        this.setState({ catches: res.data, title: "", author: "", synopsis: "" })
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
      <p> User Page to change </p>
    );
  }
}

export default Catch;
