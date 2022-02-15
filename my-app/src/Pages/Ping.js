import React, { Component } from "react";
import axios from "axios";
import "materialize-css";
class Ping extends Component {
  state = { phone: "" };
  handleChange = (event) => {
    //console.log(event.target.value);
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    //console.log(this.state.username)
  };
  render() {
    //Desktop Version
    return (
      <div>
        <div className="row">
          <div class="input-field col s4">
            <i class="material-icons prefix">phone</i>
            <input
              id="icon_telephone"
              type="tel"
              class="validate"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <label for="icon_telephone">رقم الهاتف</label>
          </div>
          <div className="input-field col s4 left-align">
            <a class="btn waves-effect waves-light" type="submit" name="action">
            اختبار  
              <i class="material-icons right">send</i>
            </a>
          </div>
          <div className="input-field col s4 left-align">
            <p>Status: Not Tested</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Ping;
