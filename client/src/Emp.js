import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
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
  delete: {
    position: "absolute",
    right: "0",
  },
  skillHold: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function Emp({ employee, parentCallBack }) {
  const classes = useStyles();
  const [newSkill, setSkill] = useState("");

  const updateSkill = (data) => {
    console.log("start:", data);
    fetch(`/api/employee/${data}`, {
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

  const deleteEmployee = (id) => {
    fetch(`/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then(console.log("succes:", id));
    parentCallBack();
  };

  const deleteSkill = (data) => {
    fetch(`/api/employees/skills/${data}`, {
      method: "DELETE",
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
    updateSkill([employee.id, newSkill]);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon="...">
        <Typography className={classes.heading}>
          {employee.firstName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* {employee.skills.map((skill, i) => (
          <Container key={i}>
            <Typography className={classes.skill}>{skill}</Typography>
            <Button
              onClick={(e) => deleteSkill([employee.id, i])}
              color="secondary"
            >
              x
            </Button>
          </Container>
        ))} */}
        {employee.skills.length ? (
          <Container>
            {employee.skills.map((skill, i) => (
              <Container key={i} className={classes.skillHold}>
                <Typography className={classes.skill}>{skill}</Typography>
                <Button
                  onClick={(e) => deleteSkill([employee.id, i])}
                  color="secondary"
                >
                  x
                </Button>
              </Container>
            ))}
          </Container>
        ) : (
          <Container>
            <Typography className={classes.skill}>No Skills</Typography>
          </Container>
        )}
      </AccordionDetails>
      <AccordionDetails>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="add new skill"
            value={newSkill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <Button variant="contained" type="button" onClick={handleSubmit}>
            Add Skill
          </Button>
        </form>
        <Button
          className={classes.delete}
          onClick={(e) => deleteEmployee(employee.id)}
          color="secondary"
        >
          delete employee
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
