import React from 'react';

const ExpressionParser = () => {


    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        
    };

    const infixtopostfix = (expression) => {
        const stack = [];
        const output = [];

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (char === ' ') continue;

            if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                while (stack.length && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop());
                }
                if (stack.length) stack.pop(); 
            } else if (char === '+' || char === '-' || char === '*' || char === '/') {
                while (
                    stack.length &&
                    precedence[char] <= precedence[stack[stack.length - 1]]
                ) {
                    output.push(stack.pop());
                }
                stack.push(char);
            } else {
                output.push(char);
            }
        }

        while (stack.length) {
            output.push(stack.pop());
        }

        return output.join('');
    };

};

const evaluatePostfix = (expression) =>{
        const numbers = ['1', '2', '3', '4', '5','6', '7', '8','9'];
        const stack = [];
        for(let i = 0; i < expression.length; i++) {
                const char = expression[i];
                if(numbers.includes(char)) {
                    stack.push(char);
                } else {
                    const num1 = stack.pop();
                    const num2 = stack.pop();
                    const result = eval(`${num2}${char}${num1}`);
                    stack.push(result);
                }
        }
}

export default ExpressionParser;