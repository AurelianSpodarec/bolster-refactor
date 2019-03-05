import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class MenuItemContainer extends Component {
    render() {
        const { location, link, children } = this.props;
        const route = location.pathname.toLowerCase();
        const isActive = link.toLowerCase() === route;

        return (
            <div className={`item ${isActive ? 'active' : ''}`}>
                <Link to={link}>{children}</Link>
            </div>
        );
    }
}

export default withRouter(MenuItemContainer);
