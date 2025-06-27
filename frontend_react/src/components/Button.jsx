import React from "react";

const Button = (props) => {
  return (
    <>
      <a className={`border p-1 rounded cursor-pointer ${props.class}`}>
        {props.text}
      </a>
    </>
  );
};

export default Button;
