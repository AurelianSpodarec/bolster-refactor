import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class FrontEndMenuItemContainer extends Component {
    render() {
        const {
            location,
            link,
            children,
            classes = '',
            handleClick = () => {}
        } = this.props;
        const route = location.pathname.toLowerCase();
        const isActive = link.toLowerCase() === route;

        return (
            <li className={`item ${classes} ${isActive ? 'active' : ''}`}>
                <Link onClick={handleClick} to={link}>
                    {children}
                </Link>
            </li>
        );
    }
}

export default withRouter(FrontEndMenuItemContainer);
