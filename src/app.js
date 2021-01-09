import React, { useState } from 'react';
import './app.css';

const App = () => {
    const [value, setValue] = useState([]);

    const onButtonClick = (num) => {
        setValue((value) => [...value, num]);
    };

    const onActionClick = (act) => {
        const idSpase = value.lastIndexOf(' '); // last space
        const lastNum = value.slice(idSpase + 1).filter((e) => !isNaN(e) || e === '.').join(''); // last number

        switch (true) {
            // set multiplication before parentheses
            case act === '(' && typeof value[value.length - 1] === 'number':
                setValue((value) => [...value, ' ', '*', ' ', act]);
                break;
            // change to negative number
            case act === '+/-':
                const neg = -lastNum;
                // double minus
                if (value[idSpase - 1] === '-') {
                    setValue((value) => [...value.slice(0, idSpase + 1), '(', neg, ')']);
                } else {
                    setValue((value) => [...value.slice(0, idSpase + 1), neg]);
                }
                break;
            // square root
            case act === 'sqrt':
                const sqrt = Math.sqrt(lastNum);
                setValue((value) => [...value.slice(0, idSpase + 1), sqrt]);
                break;
            // round
            case act === 'round':
                const round = Math.round(lastNum);
                setValue((value) => [...value.slice(0, idSpase + 1), round]);
                break;
            // 1/x
            case act === '1/x':
                const oneDiv = 1 / lastNum;
                setValue((value) => [...value.slice(0, idSpase + 1), oneDiv]);
                break;
            // x^2
            case act === 'x^2':
                const pow2 = lastNum * lastNum;
                setValue((value) => [...value.slice(0, idSpase + 1), pow2]);
                break;
            // x^3
            case act === 'x^3':
                const pow3 = lastNum * lastNum * lastNum;
                setValue((value) => [...value.slice(0, idSpase + 1), pow3]);
                break;
            // cube root
            case act === 'cbrt':
                const cbrt = Math.cbrt(lastNum);
                setValue((value) => [...value.slice(0, idSpase + 1), cbrt]);
                break;
            // natural logarithm
            case act === 'ln':
                const ln = Math.log(lastNum);
                setValue((value) => [...value.slice(0, idSpase + 1), ln]);
                break;
            // common logarithm
            case act === 'lg':
                const lg = Math.log10(lastNum);
                setValue((value) => [...value.slice(0, idSpase + 1), lg]);
                break;
            // factorial
            case act === 'n!':
                const fact = () => {
                    let result = 1;
                    let n = lastNum;
                    while (n) {
                        result *= n--;
                    }
                    return result
                };
                setValue((value) => [...value.slice(0, idSpase + 1), fact()]);
                break;
            // dot .
            case act === '.':
                setValue((value) => [...value, act]);
                break;

            default: setValue((value) => [...value, ' ', act, ' ']);
        }
    };

    const onResultClick = () => {
        if (value.length === 0) {
            return;
        }

        const valNoSpace = value.join('').replace(/\s/g, ''); //delete space
        setValue([eval(valNoSpace)]);
    };

    const onClear = () => {
        setValue([]);
    };

    const onBackspace = () => {
        if (value.length === 1) {
            onClear();
        } else {
            setValue((value) => [...value.slice(0, value.length - 1)]);
        }
    };

    const handleKey = (event) => {
        event.preventDefault();

        switch (event.keyCode) {
            case 27:
                onClear();
                break;
            case 8:
                onBackspace();
                break;

            default: ;
        }

        switch (event.key) {
            case '1':
                onButtonClick('1');
                break;
            case '2':
                onButtonClick('2');
                break;
            case '3':
                onButtonClick('3');
                break;
            case '4':
                onButtonClick('4');
                break;
            case '5':
                onButtonClick('5');
                break;
            case '6':
                onButtonClick('6');
                break;
            case '7':
                onButtonClick('7');
                break;
            case '8':
                onButtonClick('8');
                break;
            case '9':
                onButtonClick('9');
                break;
            case '0':
                onButtonClick('0');
                break;

            case '/':
                onActionClick('/');
                break;
            case '*':
                onActionClick('*');
                break;
            case '-':
                onActionClick('-');
                break;
            case '+':
                onActionClick('+');
                break;
            case '.':
                onActionClick('.');
                break;
            case '(':
                onActionClick('(');
                break;
            case ')':
                onActionClick(')');
                break;

            case 'Enter':
                onResultClick();
                break;

            default: ;
        }
    };

    const numButtons = [
        { label: 7, clazz: 'btn-primary' },
        { label: 8, clazz: 'btn-primary' },
        { label: 9, clazz: 'btn-primary' },
        { label: 4, clazz: 'btn-primary' },
        { label: 5, clazz: 'btn-primary' },
        { label: 6, clazz: 'btn-primary' },
        { label: 1, clazz: 'btn-primary' },
        { label: 2, clazz: 'btn-primary' },
        { label: 3, clazz: 'btn-primary' },
        { label: 0, clazz: 'btn-primary' },
        { label: '.', clazz: 'btn-outline-primary' }
    ];

    const mainActionButtons = [
        { label: '÷', value: '/', clazz: 'btn-warning' },
        { label: 'x', value: '*', clazz: 'btn-warning' },
        { label: '-', value: '-', clazz: 'btn-warning' },
        { label: '+', value: '+', clazz: 'btn-warning' }
    ];

    const secondActionButtons = [
        { label: '(', value: '(', clazz: 'btn-light' },
        { label: ')', value: ')', clazz: 'btn-light' },
        { label: '√', value: 'sqrt', clazz: 'btn-light' },
        { label: '+/-', value: '+/-', clazz: 'btn-light' },
        { label: 'round', value: 'round', clazz: 'btn-light' },
        { label: '1/x', value: '1/x', clazz: 'btn-light' },
        { label: 'x\u00B2', value: 'x^2', clazz: 'btn-light' },
        { label: 'x\u00B3', value: 'x^3', clazz: 'btn-light' },
        { label: '\u00B3√', value: 'cbrt', clazz: 'btn-light' },
        { label: 'ln', value: 'ln', clazz: 'btn-light' },
        { label: 'lg', value: 'lg', clazz: 'btn-light' },
        { label: 'n!', value: 'n!', clazz: 'btn-light' }
    ];

    return (
        <div className='main' onKeyDown={handleKey} tabIndex='0'>
            <div className='result'>
                <h1>{(value.length === 0) ? '0' : value.join('')}</h1>
            </div>

            <div className='container'>

                <div className="row row-cols-2">
                    <div className="d-grid col">
                        <button type='button' className='btn btn-lg btn-danger' onClick={() => onClear()}>Clear</button>
                    </div>
                    <div className="d-grid col">
                        <button type='button' className='btn btn-lg btn-dark' onClick={() => onBackspace()}>Backspace</button>
                    </div>
                </div>

                <div className="row row-cols-6">
                    {
                        secondActionButtons.map((item) => {
                            return (
                                <div key={item.label} className="d-grid col">
                                    <button type='button' className={`btn btn-sm ${item.clazz}`} onClick={() => onActionClick(item.value)}>{item.label}</button>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="row row-cols-4">
                    {
                        mainActionButtons.map((item) => {
                            return (
                                <div key={item.label} className="d-grid col">
                                    <button type='button' className={`btn btn-lg ${item.clazz}`} onClick={() => onActionClick(item.value)}>{item.label}</button>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="row row-cols-3">
                    {
                        numButtons.map((item) => {
                            return (
                                <div key={item.label} className='d-grid col'>
                                    <button type='button' className={`btn btn-lg ${item.clazz}`} onClick={() => onButtonClick(item.label)}>{item.label}</button>
                                </div>
                            )
                        })
                    }
                    <div className='d-grid col'>
                        <button type='button' className='btn btn-success btn-lg' onClick={() => onResultClick()}>=</button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default App;