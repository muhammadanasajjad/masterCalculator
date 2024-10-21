import React from "react";
import "../css/GraphicFunctions.css"
import cubicImage from '../Images/cubic.png'

const GraphicFunctions = () => {
    return (
        <div className="graphicFunctionDiv">
            <div className="graphicFunctionsSingular">
                <img src={cubicImage} alt="" className="graphicImage" />
                <div className="graphic-Text">
                    <h3>Graphic Calculator</h3>
                    <p>Graph Functions and Find Solutions</p>
                </div>
            </div>
            <div className="graphicFunctionsSingular">
                <img src={cubicImage} alt="" className="graphicImage" />
                <div className="graphic-Text">
                    <h3>Graphic Calculator</h3>
                    <p>Graph Functions and Find Solutions</p>
                </div>
            </div>
            <div className="graphicFunctionsSingular">
                <img src={cubicImage} alt="" className="graphicImage" />
                <div className="graphic-Text">
                    <h3>Graphic Calculator</h3>
                    <p>Graph Functions and Find Solutions</p>
                </div>
            </div>
        </div>
    )
}

export default GraphicFunctions;