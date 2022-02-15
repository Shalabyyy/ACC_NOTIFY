import React, { Component } from "react";
import axios from "axios";
import "materialize-css";

class Table extends Component {
  state = { result: ["X"], display: [] };
  round2dp = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/")

      .then((response) => {
        // handle success
        //console.log(response.data.Result);
        this.setState({ result: response.data.Result });
        // console.log(this.state.display, "Current State");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }
  render() {
    //Desktop Version
    console.log(this.state.display);
    return (
      <div className="">
        <table className="striped centered">
          <thead>
            <tr>
              <th>ٍStatus </th>
              <th>صافى الأجر</th>
              <th>الاجمالي الاستقطاعات</th>
              <th>الاجمالي قبل الاستقطاعات</th>
              <th>الاجمالي المستحق</th>
              <th>رقم الهاتف</th>
              <th>الاسم</th>
              <th>الكود</th>
            </tr>
          </thead>
          <tbody>
            {this.state.result.map((item, i) => (
              <tr key={i}>
                <td>Pending</td>
                <td>{this.round2dp(item.AC)}</td>
                <td>{this.round2dp(item.AB)}</td>
                <td>{this.round2dp(item.O)}</td>
                <td>{item.J}</td>
                <td>{item.AH}</td>
                <td>{item.C}</td>
                <td>{item.B}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
