import React, { Component } from "react";
import axios  from "axios";
class Home extends Component {
  state = { width: -1, height: -1, slideIndex: 1, slides: [], dots: [] };

  render() {
    //Desktop Version
    return (
      <div>
        Homepage
      </div>
    );
  }
}

export default Home;
