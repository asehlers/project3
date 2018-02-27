import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import {Collapsible, CollapsibleItem, Dropdown, Button, NavItem, Row, Col, Card} from "react-materialize";

const Catch = props => {
  console.log(props);
  let possibleText;
  if(props.catch.note){
    possibleText
  }
  if(props.catch.catchDetails[0] != null){
    return(<CollapsibleItem header={props.catch.date.substring(0, 10)}>
      {props.catch.catchDetails[0].image == null ? "" : <p><img className="responsive-img" src={props.catch.catchDetails[0].image} alt=""></img></p>}
      <Row>
        <Col s={4}>
          <span>Fish Caught:{props.catch.amountCaught}</span>
        </Col>
        <Col s={4}>
          <span> Location:{props.catch.location}</span>
        </Col>
        <Col s={4}>
          <span> Time:{props.catch.time} </span>
        </Col>
      </Row>
      <Row>
        <Col s={4}>
          <span> {props.catch.catchDetails[0].fishName == null ? "" : "Name: "+props.catch.catchDetails[0].fishName} </span>
        </Col>
        <Col s={4}>
          <span> {props.catch.catchDetails[0].bait == null ? "" : "Bait: "+props.catch.catchDetails[0].bait} </span>
        </Col>
        <Col s={4}>
          <span> {props.catch.catchDetails[0].equipment == null ? "" : "Equipment: "+props.catch.catchDetails[0].equipment} </span>
          </Col>
      </Row>
      <Row>
        <Col s={4}>
          <span> {props.catch.catchDetails[0].notes == null ? "" : "Notes: "+props.catch.catchDetails[0].notes} </span>
        </Col>
        <Col s={4}>
          <span> {props.catch.catchDetails[0].length == null ? "" : "Length: "+props.catch.catchDetails[0].length+" in"} </span>
        </Col>
        <Col s={4}>
          <span> {props.catch.catchDetails[0].weight == null ? "" : "Weight: "+props.catch.catchDetails[0].weight+" lbs"} </span>
        </Col>
      </Row>
    </CollapsibleItem>);
  } else {
    return (
      <CollapsibleItem header={props.catch.date.substring(0, 10)}>
        <Row>
          <Col s={4}>
          <span>Fish Caught:{props.catch.amountCaught} </span>
          </Col>
          <Col s={4}>
            <span> Location:{props.catch.location} </span>
          </Col>
          <Col s={4}>
            <span>  Time:{props.catch.time} </span>
          </Col>
        </Row> 
      </CollapsibleItem>);
  }
}

export default Catch;
