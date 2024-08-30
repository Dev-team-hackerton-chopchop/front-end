import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import BackgroundImage from '../../assets/images/background-img1.png';

export default function LandingPage() {
    return (
        <header style={headerStyle}>
            <h1 className="main-title text-center">Web3 Voting system</h1>
            <p className="main-para text-center">debutler-dev </p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button">log in</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>register</span></button>
                </Link>
            </div>
        </header>
    );
}

const headerStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};
