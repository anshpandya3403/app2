import React from "react";
import './display.css';
const Display = ({currentExpression,previousExpression}) => {



return(
    <div className="display">
        <div className="prev-expression">{previousExpression}</div>
        <div className="current-expression"><h1>{currentExpression}</h1></div>
    </div>
);


};

export default Display;