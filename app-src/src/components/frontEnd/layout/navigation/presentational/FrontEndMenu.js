import React from 'react';
import { Link } from 'react-router-dom';

import HomeIcon from '_content/images/frontend/buttons/home-icon.png';

const FrontEndMenu = () => (
    <div className="frontend-menu">
        <div className="container">
            <ul>
                <li className="home active">
                    <Link to="/home">
                        <img alt="Home Icon" src={HomeIcon} />
                    </Link>
                </li>

                <li>
                    <Link to="/How">How it works</Link>
                </li>

                <li>
                    <Link to="/About">About</Link>
                </li>
                <li>
                    <Link to="/Request">About</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
            </ul>
        </div>
    </div>
);

export default FrontEndMenu;
