import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  skill: {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular,
    padding: "10px",
  },
}));

export default function AddEmp({ parentCallBack }) {
  const classes = useStyles();
  const [employeeName, setName] = useState("");

  const addEmployee = (data) => {
    console.log("start:", data);
    fetch(`/api/employees/${data}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(console.log("succes:", data));
    parentCallBack();
  };

  const handleSubmit = () => {
    addEmployee([employeeName]);
  };

  return (
    <Container fixed>
      <Typography className={classes.heading}>Add new employee:</Typography>
      <form noValidate autoComplete="off">
        <TextField
          label="employee name"
          value={employeeName}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" type="button" onClick={handleSubmit}>
          Add Employee
        </Button>
      </form>
    </Container>
  );
}
