import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

import "../css/MathInput.css";
import { getLaTex } from "../utils/calculate";

const MathInput = ({ onExpressionChange = () => {} }) => {
    const [mathInput, setMathInput] = useState(""); // Store the user's input
    const inputRef = useRef(null); // Reference to the hidden input

    // Handle focusing the hidden input when clicking or typing on the MathJax area
    const handleFocusMathJaxArea = () => {
        if (inputRef.current) {
            console.log("focus");
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        onExpressionChange(mathInput);
        document.addEventListener("keyPressed", handleFocusMathJaxArea);

        return () => {
            document.removeEventListener("keyPressed", handleFocusMathJaxArea);
        };
    }, [mathInput]);

    // Update the input state whenever the user types
    const handleInputChange = (event) => {
        setMathInput(event.target.value);
    };

    // Automatically focus the input when the component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef.current]);

    return (
        <div onKeyDown={(e) => handleFocusMathJaxArea()}>
            {/* Hidden input for capturing user input */}
            <input
                ref={inputRef}
                type="text"
                value={mathInput}
                onChange={handleInputChange}
                placeholder="Enter LaTeX expression here"
                className="actual-math-input"
            />

            {/* MathJax Area that visually replaces the input */}
            <div
                className="latex-container"
                onClick={() => {
                    console.log("press");
                    handleFocusMathJaxArea();
                }} // Clicking focuses the hidden input
            >
                {mathInput.length > 0 ? (
                    <>
                        <p>
                            {getLaTex(mathInput)[1] == false &&
                                "Invalid expression:  "}
                        </p>
                        <TeX
                            onClick={() => {
                                console.log("press");
                                handleFocusMathJaxArea();
                            }}
                            className="latex"
                        >
                            {getLaTex(mathInput)[0]}
                        </TeX>
                    </>
                ) : (
                    <>
                        <p>{"0"}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default MathInput;
