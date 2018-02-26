import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import {Collapsible, CollapsibleItem} from "react-materialize";

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
      <Collapsible accordion>
        {this.state.catches.map(onecatch => <CollapsibleItem header="onecatch.date"> onecatch.amountCaught </CollapsibleItem>)}
      </Collapsible>
    );
  }
}

export default Catch;
