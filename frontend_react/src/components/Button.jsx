import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <>
      <Link
        to={props.url}
        className={`border p-1 rounded cursor-pointer ${props.class}`}
      >
        {props.text}
      </Link>
    </>
  );
};

export default Button;
