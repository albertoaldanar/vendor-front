import React from "react";

const CardView = (props) => {
  return(
    <div className = "main-content">
      {props.children}
    </div>
  );
}


export default CardView;
