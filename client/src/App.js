import React, { Component } from "react";
import "./App.css";
import Emp from "./Emp";
import Container from "@material-ui/core/Container";
import AddEmp from "./AddEmp";
class App extends Component {
  state = { employees: [] };

  componentDidMount() {
    this.getEmployees();
    console.log("employees", this.state);
  }

  getEmployees = () => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((employees) => this.setState({ employees }));
  };

  render() {
    const { employees } = this.state;

    return (
      <Container fixed>
        {employees.length ? (
          <div>
            <h1>Employees</h1>
            <ul className="employees">
              {employees.map((employee) => (
                <li key={employee.id}>
                  <Emp employee={employee} />
                </li>
              ))}
            </ul>
            <AddEmp />
          </div>
        ) : (
          <Container fixed>
            <h1>No employees:((</h1>
          </Container>
        )}
      </Container>
    );
  }
}

export default App;
