const express = require("express");
const path = require("path");
const generatePassword = require("password-generator");
const { PRIORITY_LOW } = require("constants");
const { exit } = require("process");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.get("/api/passwords", (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map((i) =>
    generatePassword(12, false)
  );

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

//ahaha playin around to understand

const employees = [
  { firstName: "mike", id: 1, skills: ["networking"] },
  { firstName: "same", id: 2, skills: [] },
  { firstName: "dan", id: 3, skills: [] },
  { firstName: "steve", id: 4, skills: [] },
  { firstName: "arnold", id: 5, skills: [] },
];

app.get("/api/employees", (req, res) => {
  res.json(employees);

  console.log(`Sent employees`);
});

// app.put("/api/employee/:id", (req, res) => {
//   console.log(req.params.id);
//   for (let i = 0; i < employees.length; i++) {
//     if (parseInt(req.params.id) === employees[i].id) {
//       if (!employees[i].skills.includes(req.params.id))
//         employees[i].skills.push(req.params.id);
//       break;
//     } else {
//       console.log("ope");
//     }
//   }
//   console.log(employees);
//   res.json(employees);
// });

// match one above, send back React's index.html file. // The "catchall" handler: for any request that doesn't
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
