import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { calculate, getLaTex } from "./utils/calculate";
import Menu from "./Menu";

import "./css/GraphCalculator.css";
import MathInput from "./components/MathInput";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Scatter } from "react-chartjs-2";
import { min, mode } from "mathjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

const GraphCalculator = () => {
    const [answer, setAnswer] = useState("0");
    const blurLight = useRef(); // State to track cursor position
    const containerRef = useRef(null); // Ref to track the container position

    const handleMouseMove = (e) => {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();

        // Calculate cursor position relative to the container
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        blurLight.current?.setPosition({ x, y });
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
        }, 1);
    });

    return (
        <div className="App" onMouseMove={handleMouseMove}>
            <div class="loader" id="loader">
                <p class="loader-text" id="loader-text">
                    0
                </p>
            </div>
            <div className="allElements" id="popup-active-elements">
                <Menu clickMenu={clickMenu} />
                <div className="large-bottom-container">
                    <div class="graph-container">
                        <Graphing />
                    </div>
                    <div class="blur-container" ref={containerRef}>
                        <div class="functions-string-container">
                            <FunctionContainer />
                        </div>
                        <BlurLight ref={blurLight} />
                    </div>
                </div>
            </div>
        </div>
    );
    function clickMenu() {
        const menu = document.getElementById("Menu-Open");
        menu.classList.toggle("active");
    }
};

const BlurLight = forwardRef(({}, ref) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useImperativeHandle(ref, () => ({
        setPosition: (tempPosition) => setPosition(tempPosition),
    }));

    return (
        <div
            className="blur-light"
            style={{
                left: position.x,
                top: position.y,
            }}
        />
    );
});

const FunctionContainer = () => {
    const handleExpressionChange = (expression) => {};
    return (
        <div>
            <MathInput onExpressionChange={handleExpressionChange} />
        </div>
    );
};

const Graphing = ({ functions = ["x^2"] }) => {
    const [chartArea, setChartArea] = useState({
        xStartValue: 0,
        xEndValue: 10,
        yStartValue: 0,
        yEndValue: 10,
    });
    const points = generatePointsFromFunctions(functions, chartArea);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                position: { x: 0 },
                min: chartArea.yStartValue,
                max: chartArea.yEndValue,
            },
            x: {
                position: { y: 0 },
                min: chartArea.xStartValue,
                max: chartArea.xEndValue,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "xy",
                    onZoomComplete: (e) => {
                        setChartArea({
                            xStartValue: e.chart.scales.x._startValue,
                            xEndValue: e.chart.scales.x._endValue,
                            yStartValue: e.chart.scales.y._startValue,
                            yEndValue: e.chart.scales.y._endValue,
                        });
                    },
                },
                pan: {
                    enabled: true,
                    mode: "xy",
                    modifierKey: "ctrl",
                    onPanComplete: (e) => {
                        setChartArea({
                            xStartValue: e.chart.scales.x._startValue,
                            xEndValue: e.chart.scales.x._endValue,
                            yStartValue: e.chart.scales.y._startValue,
                            yEndValue: e.chart.scales.y._endValue,
                        });
                    },
                },
            },
        },
    };

    console.log(points);

    const data = {
        datasets: [
            {
                label: "Dataset 1",
                data: points[0],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(75, 192, 192, 1)",
                pointRadius: 0,
                fill: false,
                showLine: true,
            },
        ],
    };

    return <Scatter className="graph-chart" options={options} data={data} />;
};

const generatePointsFromFunctions = (functions, chartArea) => {
    return functions.map((f) => {
        const points = [];
        for (
            let x = chartArea.xStartValue;
            x <= chartArea.xEndValue;
            x += Math.min(
                (chartArea.xEndValue - chartArea.xStartValue) / 200,
                0.5
            )
        ) {
            points.push({ x, y: calculate(f, { x }) });
        }
        return points;
    });
};

export default GraphCalculator;

/*import React from 'react';

export function App() {
  return <Line options={options} data={data} />;
}
 */
