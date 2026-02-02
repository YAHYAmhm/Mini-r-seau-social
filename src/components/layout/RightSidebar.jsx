import React from 'react';
import advertisementImg from '../../assets/advertisement.png';
import codeImg from '../../assets/code.jpg';
import lelouImg from '../../assets/lelou.jpg';

const RightSidebar = () => {
    return (
        <div className="right-sidebar">
            <div className="sidebar-title">
                <h4>Events</h4>
                <a href="#">See All</a>
            </div>

            <div className="event">
                <div className="left-event">
                    <h3>21</h3>
                    <span>November</span>
                </div>
                <div className="right-event">
                    <h4>Social Media</h4>
                    <p><i className="fa-solid fa-location-dot"></i> Casablanca</p>
                    <a href="#">More Info</a>
                </div>
            </div>

            <div className="sidebar-title">
                <h4>Advertisement</h4>
                <a href="#">Close</a>
            </div>
            <img src={advertisementImg} className="sidebar-ads" alt="ads" />

            <div className="sidebar-title">
                <h4>Conversation</h4>
                <a href="#">Hide Chat</a>
            </div>
            <div className="online-list">
                <div className="online"><img src={codeImg} alt="user" /></div>
                <p>3li</p>
            </div>
            <div className="online-list">
                <div className="online"><img src={lelouImg} alt="user" /></div>
                <p>7amouda</p>
            </div>
        </div>
    );
};

export default RightSidebar;
