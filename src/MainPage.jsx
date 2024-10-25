import { useRef, useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import CalculatorFunctions from "./components/CalculatorFunctions";
import GraphicFunctions from "./components/GraphicFunctions";
import { calculate, getLaTex } from "./utils/calculate";
import MathInput from "./components/MathInput";

import Menu from "./Menu";

function MainPage() {
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

    window.addEventListener("load", () => {
        let count = 0;
        const loader = document.querySelector(".loader");
        const textLoaded = document.getElementById("loader-text");
        let loading = setInterval(function () {
            if (count == 101) {
                loader.classList.add("loader-hidden");
                loader.addEventListener("transitionend", () => {
                    loader.remove();
                });
            } else {
                textLoaded.innerHTML = count;
                count += 1;
            }
        }, 10);
    });

    return (
        <div className="App" onMouseMove={handleMouseMove}>
            <div class="loader" id="loader">
                <p class="loader-text" id="loader-text"></p>
            </div>
            <div className="showing" id="popup-active-show">
                <div className="close" id="close" onClick={historyFunction}>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <button
                    id="b1"
                    onClick={() => {
                        replaceCalcText("b1");
                    }}
                >
                    <p>364 + 1</p>
                    <h2>365</h2>
                </button>
                <button
                    id="b2"
                    onClick={() => {
                        replaceCalcText("b2");
                    }}
                >
                    <p>Ans</p>
                    <h2>345908345</h2>
                </button>
                <button
                    id="b3"
                    onClick={() => {
                        replaceCalcText("b3");
                    }}
                >
                    <p>Ans</p>
                    <h2>238723498</h2>
                </button>
            </div>
            <div className="allElements" id="popup-active-elements">
                <Menu clickMenu={clickMenu} toggleMode={toggleMode} />
                <div className="large-bottom-container">
                    <button
                        className="history-button-function"
                        onClick={historyFunction}
                    >
                        <ion-icon
                            size="large"
                            name="clipboard-outline"
                        ></ion-icon>
                    </button>
                    <div className="calculator-display">
                        <div>
                            <MathInput
                                onExpressionChange={handleExpressionChange}
                            />
                            <div className="answer" id="calc-ans">
                                {answer}
                            </div>
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
            </div>
        </div>
    );
    function clickMenu() {
        const menu = document.getElementById("Menu-Open");
        menu.classList.toggle("active");
    }

    function toggleMode() {
        const toggler = document.getElementById("mode-toggler");
        const togglerCircle = document.getElementById("toggler-circle");

        toggler.classList.toggle("mode-toggler-light");
        togglerCircle.classList.toggle("toggler-circle-light");
        document.body.classList.toggle("light-mode")
    }

    function historyFunction() {
        const entireWeb = document.getElementById("popup-active-elements");
        const popupShown = document.getElementById("popup-active-show");

        entireWeb.classList.toggle("popup-active-elements");
        popupShown.classList.toggle("popup-active-shown");
        popupShown.classList.toggle("showing");
    }

    function replaceCalcText(buttonID) {
        const button = document.getElementById(buttonID);
        const buttonValue = button.lastChild.innerText;
        setAnswer(buttonValue);
    }
}

export default MainPage;
