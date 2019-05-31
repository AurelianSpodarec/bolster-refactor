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
                    <Link onClick={this.logout} to={link}>
                        {children}
                    </Link>
                )}
            </div>
        );
    }

    logout = e => {
        const { history, logout = false } = this.props;
        e.preventDefault();
        if (logout) {
            localStorage.setItem('token', '');

            history.replace('/auth/login');
        }
    };
}

export default withRouter(MenuItemContainer);
