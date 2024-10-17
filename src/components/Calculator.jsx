import React from "react";
import "../css/Calculator.css";

const Calculator = () => {
    return (
        <div class="calculator-container">
            <div className="recent-functions-container">
                <div className="recent-function button">sin</div>
                <div className="recent-function button">cos</div>
                <div className="recent-function button">tan</div>
            </div>
            <div class="calculator">
                <div class="button function dark">
                    <ion-icon name="layers"></ion-icon>
                </div>
                <div class="button function dark del">
                    <ion-icon name="backspace"></ion-icon>
                </div>
                <div class="button function">÷</div>
                <div class="button function">×</div>
                <div class="button">7</div>
                <div class="button">8</div>
                <div class="button">9</div>
                <div class="button function">-</div>
                <div class="button">4</div>
                <div class="button">5</div>
                <div class="button">6</div>
                <div class="button function">+</div>
                <div class="button">1</div>
                <div class="button">2</div>
                <div class="button">3</div>
                <div class="button equals function">=</div>
                <div class="button zero">0</div>
                <div class="button">.</div>
            </div>
        </div>
    );
};

export default Calculator;
