import React,{useState,useEffect} from 'react';
import './calculator.css';
import Layout from '../../components/Layout';
import Display from '../../components/Display';


const Calculator = () => {
    //states decleration 
    const [value,setValue] = useState("");
    const [previous,setPrevious] = useState("");
    const [calculate,setCalculate] = useState(false);
    const [writeover,setWriteOver] = useState(false);
    const [history,setHistory] = useState([]);
    const [last,setLast] = useState("");
    
    //arrays to check input
    const numbers = ['0','1','2','3','4','5','6','7','8','9','(',')','.'];
    const operators = ['+','-','÷','×'];

    //calculate value
    const  Calculate = (expression) =>{
        
        setHistory([...history,expression]);
        const newExpression = expression.replace('×','*')
        .replace('÷','/');
        return eval(newExpression).toString();
    };

    //clear function
    const Clear = () =>{
        setValue("");
        setPrevious("");        
        setCalculate(false);
        setWriteOver(false);
        setHistory([]);
    };

    //backspace function
    const handleBackSpace = () =>{
        if(value&&!writeover){
            setValue(value.slice(0,-1));
        }
        }

    //handle keyboard input
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

    //take keyboard input
    useEffect(()=>{
        window.addEventListener('keydown',handleKeyboard);
        return ()=>{
            window.removeEventListener('keydown',handleKeyboard);
        }


    },[value,previous]);
    
//calculator logic 
    const handleNumberClick = (symbol) => {
      
       //hande number input
        if(numbers.includes(symbol)){
       
        if(!writeover){
        setValue(prevValue=>prevValue+symbol);
        setCalculate(false); 
        }
        //overwrite number
        else{
            setValue(symbol);
            setCalculate(false);
            setWriteOver(false);
            
        }
        }


        //operator input
        else if(operators.includes(symbol)){
            if(calculate){ 
                const prevValue = `${previous}${value}=`;
                const answer = Calculate(`${previous}${value}`);
                setValue(answer);
                setPrevious(prevValue);
                setWriteOver(true);
                setCalculate(true);
            }
            else if(!calculate){
                setPrevious(value+symbol);
                setWriteOver(true);
                setCalculate(true);
            }

        }


        //equal sign input
        else if(symbol === '=' || symbol === 'Enter'){
            const prevValue = `${previous}${value}=`;
            const answer = Calculate(`${previous}${value}`);
            setValue(answer);
            setPrevious(prevValue);
            setWriteOver(true);
            setCalculate(false);
           
        }

        //clear
        else if(symbol === 'C'||symbol === 'c'){
            Clear();
        }

        //backspace
        else if(symbol === 'Backspace'){
            handleBackSpace();
        }
        
        console.log(calculate);
        console.log(value)
    };


   

    

    


    
   
    return(


        <div className='main_container'>
                <Display currentExpression={value} previousExpression={previous}/>
                <Layout onClickHandler={handleNumberClick}/>
               
               
        </div>


    );
};


export default Calculator;

