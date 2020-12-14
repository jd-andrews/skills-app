import React, { useEffect } from "react";

export default function Emp({ employee }) {
  useEffect(() => console.log("component updated"));

  return (
    <div>
      <p>{employee.firstName}</p>
      <p>{employee.id}</p>
      {/* <p>{employee.skills}</p> */}
    </div>
  );
}
