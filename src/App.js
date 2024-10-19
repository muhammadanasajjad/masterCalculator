import { useEffect, useRef, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import CalculatorFunctions from "./components/CalculatorFunctions";
import { calculate, getLaTex } from "./utils/calculate";
import MathInput from "./components/MathInput";

function App() {
    const [answer, setAnswer] = useState("0");
    const [position, setPosition] = useState({ x: 0, y: 0 }); // State to track cursor position
    const containerRef = useRef(null); // Ref to track the container position
    const mathInputRef = useRef(null);

    const handleMouseMove = (e) => {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();

        // Calculate cursor position relative to the container
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        setPosition({ x, y });
    };

    const handleExpressionChange = (expression) => {
        // const answer = calculate(expression);
        // setAnswer(answer);
        if (getLaTex(expression)[1])
            setAnswer(expression != "" ? calculate(expression) : "0");
        console.log(expression);
    };

    return (
        <div className="App" onMouseMove={handleMouseMove}>
            <div class="top-nav-container"></div>
            <div className="large-bottom-container">
                <div className="calculator-display">
                    <MathInput onExpressionChange={handleExpressionChange} />
                    <div className="answer">{answer}</div>
                </div>
                <div class="blur-container" ref={containerRef}>
                    {window.innerWidth > 822 && ( // to hide when screen is too small
                        <>
                            <div className="element-large-container">
                                <CalculatorFunctions />
                            </div>
                            <div className="element-separator first" />
                        </>
                    )}
                    <div className="element-large-container">
                        <Calculator />
                    </div>

                    <div
                        className="blur-light"
                        style={{
                            left: position.x,
                            top: position.y,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
