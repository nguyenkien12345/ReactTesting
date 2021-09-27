import React, { useState } from 'react';
import './Counter.css';

function Counter() {

    const [counterValue,setCounterValue] = useState(0);
    const [inputValue,setInputValue] = useState(1);

    const handleAddClick = () => {
        setCounterValue(counterValue + inputValue);
    };

    const handleSubtractClick = () => {
        setCounterValue(counterValue - inputValue);
    };

    const handleOnChangeValue = (e) => {
        // Giá trị trong input luôn luôn là string
        setInputValue(parseInt(e.target.value));
    };

    return (
        <div>
            <h3 data-testid="header">My Counter</h3>

            <h2 data-testid="counter" className={`${counterValue >= 100 ? "green" : ""}${counterValue <= -100 ? "red" : ""}`}>{counterValue}</h2>

            <button data-testid="subtract-btn" onClick={handleSubtractClick}>-</button>

            <input type="number" className="text-center" data-testid="input" 
            value={inputValue} 
            onChange={handleOnChangeValue}
            />

            <button data-testid="add-btn" onClick={handleAddClick}>+</button>
        </div>
    )
}

export default Counter;

// Lý thuyết (Kênh YouTube: Laith Harb => React Testing Library Crash Course - 2021)

// Bắt buộc thuộc tính phải là data-testid

