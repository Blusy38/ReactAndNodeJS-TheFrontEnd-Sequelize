import React from "react";

const Button = props => {
  //console.log(props.style);
  return (
    <button
      style={props.style}
      className={props.type}
      onClick={props.action}
      type="submit"
      name={props.name}
      disabled={props.isDisabled ? "disabled" : false} 
    >
      {props.title}
    </button>
  );
};

export default Button;