import React from "react";
import { Link } from "react-router-dom";

import onlineIcon from "../assets/onlineIcon.png";
import closeIcon from "../assets/closeIcon.png";

import "../stylesheets/InfoBar.css";

const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <Link to="/">
                <img src={closeIcon} alt="close icon" />
            </Link>
        </div>
    </div>
);

export default InfoBar;
