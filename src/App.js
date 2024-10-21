import { useEffect, useRef, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import CalculatorFunctions from "./components/CalculatorFunctions";
import GraphicFunctions from "./components/GraphicFunctions";
import { calculate, getLaTex } from "./utils/calculate";
import MathInput from "./components/MathInput";
import { click } from "@testing-library/user-event/dist/click";

import cubicImage from "../src/Images/cubic.png"
import quadraticImage from "../src/Images/quadratic.png"
import linearImage from "../src/Images/linear.png"
import trigImage from "../src/Images/trig.png"

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
            <div className="showing" id="popup-active-show">
                <button id="b1" onClick={replaceCalcText(document.getElementById("b1"))}>
                    <p>364 + 1</p>
                    <h2>365</h2>
                </button>
                <button>
                    <p>364 + 1</p>
                    <h2>365</h2>
                </button>
                <button>
                    <p>364 + 1</p>
                    <h2>365</h2>
                </button>
            </div>
            <div className="allElements" id="popup-active-elements">
                <div class="top-nav-container">
                    <div className="Hamburger-Menu" onClick={clickMenu}>
                        <div className="menu-button light">
                            <ion-icon size="large" name="menu-outline"></ion-icon>
                        </div>
                    </div>
                    <div id="Menu-Open" className="whole-screen-menu">
                        <div className="menu-strings">
                            <li className="menu-list">
                                <ul className="menu-value hover-underline-animation center">Derivative Calculator</ul>
                                <ul className="menu-value hover-underline-animation center">Integration Calculator</ul>
                                <ul className="menu-value hover-underline-animation center">Graphing Calculator</ul>
                                <ul className="menu-value hover-underline-animation center">Image Upload</ul>
                                <ul className="menu-value hover-underline-animation center">Saved Equations</ul>
                                <ul className="menu-value hover-underline-animation center">Need Help ?</ul>
                            </li>
                        </div>
                        <div className="menu-graphs">
                            <button className="menu-button-image">
                                <img className="menu-image" src={cubicImage}></img>
                                <p className="hide">Cubic Graphs</p>
                            </button>
                            <button className="menu-button-image">
                                <img className="menu-image" src={quadraticImage}></img>
                                <p className="hide">Quadratic Graphs</p>
                            </button>
                            <button className="menu-button-image">
                                <img className="menu-image" src={linearImage}></img>
                                <p className="hide">Linear Graphs</p>
                            </button>
                            <button className="menu-button-image">
                                <img className="menu-image" src={trigImage}></img>
                                <p className="hide">Trig Graphs</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="large-bottom-container">
                    <div className="calculator-display">
                        <button className="history-button-function" onClick={historyFunction}>
                            <ion-icon size="large" name="clipboard-outline"></ion-icon>
                        </button>
                        <div>
                            <MathInput onExpressionChange={handleExpressionChange} />
                            <div className="answer" id="calc-ans">{answer}</div>
                        </div>
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
        </div>


    );
    function clickMenu() {
        const menu = document.getElementById("Menu-Open")
        menu.classList.toggle("active")
    }

    function historyFunction() {
        const entireWeb = document.getElementById("popup-active-elements")
        const popupShown = document.getElementById("popup-active-show")

        entireWeb.classList.toggle("popup-active-elements")
        popupShown.classList.toggle("popup-active-shown")
        popupShown.classList.toggle("showing")
    }

    function replaceCalcText(buttonValue) {
        const calcDisplay = document.getElementById("calc-ans")
        buttonValue.value = calcDisplay.value
    }
}

export default App;
