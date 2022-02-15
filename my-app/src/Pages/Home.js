import React, { Component } from "react";
import axios from "axios";
import "materialize-css";
import Table from "./Table";
import Ping from "./Ping";
class Home extends Component {
  
  render() {
    //Desktop Version
    return (
      <div className="container">
        <h2 className="center align">نظام الإخطار بالراتب</h2>
        <Ping />
        <Table />
      </div>
    );
  }
}

export default Home;
