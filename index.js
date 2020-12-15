const express = require("express");
const path = require("path");
const { PRIORITY_LOW } = require("constants");
const { exit } = require("process");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

///establishing pseudo-DB
const employees = [
  { firstName: "mike", id: 1, skills: ["networking"] },
  { firstName: "same", id: 2, skills: [] },
  { firstName: "dan", id: 3, skills: [] },
  { firstName: "steve", id: 4, skills: [] },
  { firstName: "arnold", id: 5, skills: [] },
];

///initial get call to get list of employees
app.get("/api/employees", (req, res) => {
  res.json(employees);
  console.log(`Sent employees`);
});

///put call to add new employee
app.put("/api/employees/:data", (req, res) => {
  let newId = Math.floor(Math.random() * 101);
  let currentIds = [];
  for (let i = 0; i < employees.length; i++) {
    currentIds.push(employees[i].id);
  }
  while (currentIds.includes(newId)) {
    newId = Math.floor(Math.random() * 1001);
  }
  employees.push({
    firstName: req.params.data,
    id: newId,
    skills: [],
  });
  console.log("service employees", employees);
  res.json(employees);
});

///delete call to remove employee

app.delete("/api/employees/:id", (req, res) => {
  let id = req.params.id;
  for (let i = 0; i < employees.length; i++) {
    if (parseInt(id) === employees[i].id) {
      employees.splice(i, 1);
    } else {
    }
  }
});

///put call to add skills, but won't add skills if already there
app.put("/api/employee/:id", (req, res) => {
  console.log(req.params.id);
  for (let i = 0; i < employees.length; i++) {
    if (parseInt(req.params.id) === employees[i].id) {
      if (!employees[i].skills.includes(req.params.id))
        employees[i].skills.push(req.params.id.replace(/[0-9]|,/g, ""));
      break;
    } else {
      console.log("ope");
    }
  }
  console.log(employees);
  res.json(employees);
});

///put call to remove skill

// match one above, send back React's index.html file. // The "catchall" handler: for any request that doesn't
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
