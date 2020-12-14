import React, { Component } from "react";
import "./App.css";
import Emp from "./Emp";

class App extends Component {
  state = { passwords: [], employees: [] };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((employees) => this.setState({ employees }));
  };

  updateSkill = (data) => {
    fetch(`/api/employee/${data}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(console.log("succes:", data));
  };

  render() {
    const { employees } = this.state;
    console.log(employees);

    return (
      <div className="App">
        {employees.length ? (
          <div>
            <h1>Employees</h1>
            <ul className="passwords">
              {employees.map((employee) => (
                <li key={employee.id}>
                  <Emp employee={employee} />
                  <p>{employee.skills}</p>
                </li>
              ))}
            </ul>
            <button
              className="more"
              onClick={() => {
                this.updateSkill([1, "typescript"]);
              }}
            >
              Get More
            </button>
          </div>
        ) : (
          <div>
            <h1>No employees:((</h1>
            {/* <button className="more" onClick={this.updateSkill(1)}>
              try Again?
            </button> */}
          </div>
        )}
      </div>
    );
  }
}

export default App;
