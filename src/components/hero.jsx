import React from "react";
import Earth from "./Hero/earth";
import "./css/hero.css";
import EarthSVG from "../assets/Earth.svg";

const Hero = () => {
    return (
        <>
        <div className="w-full h-screen flex section hero-div">
            <div className="left">
                    <p className="title">
                        Empowering Communities through Shared Solar Investment: A Blockchain-Based Sustainable Platform
                    </p>
                    <div className="content-div">
                        <p className="content">
                        A community solar sharing platform that enables individuals and organizations to invest in solar projects, while providing them with a share of the generated electricity.
                        </p>
                        <button>
                            Get Started
                        </button>
                    </div>
            </div>
            <div className="right">
                <img src={EarthSVG} alt="earth" />
            </div>
            <div className="bottom-right">
                <p className="bottom-right-title">
                    Solar Project Support
                </p>
                <p className="bottom-right-content">
                Join us in making renewable energy accessible for everyone.
                    </p>
                    <p className="bottom-right-button">
                        Discover More
                    </p>
            </div>
        </div>
        </>
    )
}

export default Hero;
