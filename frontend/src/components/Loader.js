import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      style={{
        width: "100px",
        height: "100px",
        display: "block",
        margin: "auto",
        marginTop: "30vh",
      }}
    ></Spinner>
  );
};

export default Loader;
