import React from 'react';
import './button.css';

const Button = ({number,onClickHandler}) => {

    return(
        <div className='number-card' onClick={()=>onClickHandler(number)}>
            <h1>{number}</h1>
        </div>
    );

};
export default Button;
