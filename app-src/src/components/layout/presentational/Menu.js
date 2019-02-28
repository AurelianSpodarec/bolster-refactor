import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
    <div className="menu size-lg-4">
        <div className="item">
            <Link to="">
                <i className="fa fa-house" /> Dashboard
            </Link>
        </div>
    </div>
);

export default Menu;
