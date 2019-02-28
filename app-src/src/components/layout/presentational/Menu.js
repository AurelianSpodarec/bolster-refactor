import React from 'react';
import { Link } from 'react-router-dom';

const Menu = messageCount => (
    <div className="menu size-lg-3">
        <div className="item">
            <Link to="/dashboard">
                <i className="fa fa-home icon" /> Dashboard
            </Link>
        </div>
        <div className="item">
            <Link to="/sites">
                <i className="fa fa-building icon" /> Sites
            </Link>
        </div>
        <div className="item">
            <Link to="/Users">
                <i className="fa fa-users icon" /> User Management
                <i className="fa fa-chevron-right arrow" />
                <i className="fa fa-chevron-down arrow" />
            </Link>
            <div className="sub-menu">
                <div className="item">
                    <Link to="">Drawing Credit Log</Link>
                </div>
                <div className="item">
                    <Link to="">Pin Options</Link>
                </div>
                <div className="item">
                    <Link to="">Support</Link>
                </div>
            </div>
        </div>
        <div className="item">
            <Link to="/Reports">
                <i className="far fa-file icon" /> Reports
            </Link>
        </div>
        <div className="item">
            <Link to="/Messages">
                <span className="messages">
                    <i className="far fa-envelope" />
                    <sub>1</sub>
                </span>
                Message Centre
            </Link>
        </div>
        <div className="item open">
            <Link to="">
                <i className="far fa-wrench icon" /> Tools & Resources
                <i className="fa fa-chevron-right arrow" />
                <i className="fa fa-chevron-down arrow" />
            </Link>
            <div className="sub-menu">
                <div className="item">
                    <Link to="">Drawing Credit Log</Link>
                </div>
                <div className="item">
                    <Link to="">Pin Options</Link>
                </div>
                <div className="item">
                    <Link to="">Support</Link>
                </div>
            </div>
        </div>
    </div>
);

export default Menu;
