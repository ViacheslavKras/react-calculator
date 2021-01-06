import React, { useState } from 'react';
import './app.css';

const App = () => {
    const [value, setValue] = useState([]);

    const onButtonClick = (num) => {
        setValue((value) => [...value, num]);
    };

    const onActionClick = (act) => {
        const idSpase = value.lastIndexOf(' '); // last space
        const targ = value.slice(idSpase + 1).filter((e) => !isNaN(e) || e === '.').join(''); // last number

        switch (true) {
            // set multiplication before parentheses
            case act === '(' && typeof value[value.length - 1] === 'number':
                setValue((value) => [...value, ' ', '*', ' ', act]);
                break;
            // change to negative number
            case act === '+/-':
                const neg = -targ;
                // double minus
                if (value[idSpase - 1] === '-') {
                    setValue((value) => [...value.slice(0, idSpase + 1), '(', neg, ')']);
                } else {
                    setValue((value) => [...value.slice(0, idSpase + 1), neg]);
                }
                break;
            // square root
            case act === 'sqrt':
                const sqrt = Math.sqrt(targ);
                setValue((value) => [...value.slice(0, idSpase + 1), sqrt]);
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
        { label: '+/-', value: '+/-', clazz: 'btn-light' }
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