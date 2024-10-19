import React from "react";
import "../css/GraphicFunctions.css"
import graphicImage from '../Images/quadratic.png'

const GraphicFunctions = () => {
    return (
        <div className="graphicFunctionDiv">
            <div className="graphicFunctionsSingular">
                <img src={graphicImage} alt="" className="graphicImage" />
                <div className="graphic-Text">
                    <h3>Graphic Calculator</h3>
                    <p>Graph Functions and Find Solutions</p>
                </div>
            </div>
            <div className="graphicFunctionsSingular">
                <img src={graphicImage} alt="" className="graphicImage" />
                <div className="graphic-Text">
                    <h3>Graphic Calculator</h3>
                    <p>Graph Functions and Find Solutions</p>
                </div>
            </div>
            <div className="graphicFunctionsSingular">
                <img src={graphicImage} alt="" className="graphicImage" />
                <div className="graphic-Text">
                    <h3>Graphic Calculator</h3>
                    <p>Graph Functions and Find Solutions</p>
                </div>
            </div>
        </div>
    )
}

export default GraphicFunctions;