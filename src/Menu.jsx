import React from "react";

import cubicImage from "../src/Images/cubic.png";
import quadraticImage from "../src/Images/quadratic.png";
import linearImage from "../src/Images/linear.png";
import trigImage from "../src/Images/trig.png";
const Menu = ({ clickMenu = () => {} }) => {
    return (
        <div>
            <div class="top-nav-container">
                <div className="Hamburger-Menu">
                    <div className="menu-button light">
                        <ion-icon
                            size="large"
                            name="menu-outline"
                            onClick={clickMenu}
                        ></ion-icon>
                    </div>
                </div>
                <div id="Menu-Open" className="whole-screen-menu">
                    <div className="menu-strings">
                        <li className="menu-list">
                            <ul className="menu-value hover-underline-animation center">
                                Derivative Calculator
                            </ul>
                            <ul className="menu-value hover-underline-animation center">
                                Integration Calculator
                            </ul>
                            <ul className="menu-value hover-underline-animation center">
                                Graphing Calculator
                            </ul>
                            <ul className="menu-value hover-underline-animation center">
                                Image Upload
                            </ul>
                            <ul className="menu-value hover-underline-animation center">
                                Saved Equations
                            </ul>
                            <ul className="menu-value hover-underline-animation center">
                                Need Help ?
                            </ul>
                        </li>
                    </div>
                    <div className="menu-graphs">
                        <button className="menu-button-image">
                            <img className="menu-image" src={cubicImage}></img>
                            <p className="hide">Cubic Graphs</p>
                        </button>
                        <button className="menu-button-image">
                            <img
                                className="menu-image"
                                src={quadraticImage}
                            ></img>
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
        </div>
    );
};

export default Menu;
