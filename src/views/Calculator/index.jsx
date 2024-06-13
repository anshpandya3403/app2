import React,{useState,useEffect} from 'react';
import './calculator.css';
import Layout from '../../components/Layout';
import Display from '../../components/Display';


const Calculator = () => {
    const [value,setValue] = useState("");
    const [previous,setPrevious] = useState("");
    const [calculate,setCalculate] = useState(false);
    const [writeover,setWriteOver] = useState(false);



    const numbers = ['0','1','2','3','4','5','6','7','8','9','(',')','.'];
    const operators = ['+','-','÷','×'];


    const Calculate = (expression) =>{
        console.log(expression);
        const newExpression = expression.replace('×','*')
        .replace('÷','/');
        return eval(newExpression);
    };


    const handleNumberClick = (symbol) => {
       
       
        if(numbers.includes(symbol)){
        if(!writeover){
        setValue(prevValue=>prevValue+symbol);
        }
        else{
            setValue(symbol);
            setWriteOver(false);
        }
        console.log(value);
        }
        else if(operators.includes(symbol)&&!calculate){
            setPrevious(value+symbol);
            setWriteOver(true);
            setCalculate(true);
           
        }
        else if(operators.includes(symbol)&&Calculate){
            if(writeover){
                setPrevious(value+symbol);
            }
            else{
            const answer = Calculate(`${previous}${value}`);
            const prevValue = `${answer}${symbol}`;
            setValue(answer);
            setPrevious(prevValue);
            setCalculate(true);
            setWriteOver(true);
            }
        }
        else if(symbol === '=' || symbol === 'Enter'){
            const prevValue = `${previous}${value}=`;
            const answer = Calculate(`${previous}${value}`);
            setValue(answer);
            setPrevious(prevValue);
            setWriteOver(true);
            setCalculate(false);
           
        }
        else if(symbol === 'C'||symbol === 'c'){
            Clear();
        }
        else if(symbol === 'Backspace'){
            handleBackSpace();
        }
        //console.log(calculate);
    };


    const Clear = () =>{
        setValue("");
        setPrevious("");        
        setCalculate(false);
        setWriteOver(false);
    };

    const handleBackSpace = () =>{
    if(value&&writeover){
        setValue(value.slice(0,-1));
    }
    }

    const handleKeyboard = (e) =>{
        if(e.key === '*'){
            handleNumberClick('×')
        }
        else if(e.key === '/'){
            handleNumberClick('÷')
        }
        else{
            handleNumberClick(e.key);
        }
    }


    useEffect(()=>{
        window.addEventListener('keydown',handleKeyboard);
        return ()=>{
            window.removeEventListener('keydown',handleKeyboard);
        }


    },[value,previous]);
   
    return(


        <div className='main_container'>
                <Display currentExpression={value} previousExpression={previous}/>
                <Layout onClickHandler={handleNumberClick}/>
               
               
        </div>


    );
};


export default Calculator;

