import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class MenuItemContainer extends Component {
    render() {
        const { location, link, children, external = false } = this.props;
        const route = location.pathname.toLowerCase();
        const isActive = link.toLowerCase() === route;

        return (
            <div className={`item ${isActive ? 'active' : ''}`}>
                {external ? (
                    <a href={link}>{children}</a>
                ) : (
                    <Link to={link}>{children}</Link>
                )}
            </div>
        );
    }
}

export default withRouter(MenuItemContainer);
