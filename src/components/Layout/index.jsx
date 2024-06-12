import React from "react";
import Button from "../Button";
import './layout.css';


const Layout = ({onClickHandler}) =>{
    const buttons = ['+','=','.','0','-','3','2','1','×','6','5','4','÷','9','8','7','C',')','(',''];
    return(
        <div className="numberlist">
    
            {
                buttons.reverse().map((number) => (<Button number={number} key={number} onClickHandler={onClickHandler}/>))
            }
        </div>
    );
};

export default Layout;