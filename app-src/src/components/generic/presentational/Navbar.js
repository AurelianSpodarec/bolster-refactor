import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ navItems }) => (
    <nav className="z-depth-0">
        <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
                Home
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {navItems.map(item => (
                    <li
                        className={item.isActive ? 'active' : ''}
                        key={item.text}
                    >
                        <Link to={item.link}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
);

export default Navbar;
