import { useRef, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import CalculatorFunctions from "./components/CalculatorFunctions";
import GraphicFunctions from "./components/GraphicFunctions";
import MenuFunction from "./components/Menu";

function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 }); // State to track cursor position
    const containerRef = useRef(null); // Ref to track the container position

    const handleMouseMove = (e) => {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();

        // Calculate cursor position relative to the container
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        setPosition({ x, y });
    };


    return (
        <div className="App" onMouseMove={handleMouseMove}>
            <div class="top-nav-container">
                <MenuFunction />
            </div>
            <div className="large-bottom-container">
                <div className="calculator-display">
                    <div className="operation">5 + 0.235</div>
                    <div className="answer">5.235</div>
                </div>
                <div class="blur-container" ref={containerRef}>
                    {window.innerWidth > 822 && ( // to hide when screen is too small
                        <>
                            <div className="element large-container">
                                <GraphicFunctions />
                            </div>
                            <div className="element-separator first" />
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
        </div >
    );
}

export default App;
