import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class MenuItemContainer extends Component {
    state = {
        hover: false
    };

    render() {
        const {
            location,
            link,
            children,
            external = false,
            logout = false,
            onClick = () => {},
            base = false
        } = this.props;
        const route = location.pathname.toLowerCase();
        const isActive = base
            ? link.toLowerCase() === route
            : route.toLowerCase().includes(link.toLowerCase());

        return (
            <div className={`item ${isActive ? 'active' : ''}`}>
                {external ? (
                    <a href={link}>{children}</a>
                ) : logout ? (
                    <Link onClick={this.logout} to={link}>
                        {children}
                    </Link>
                ) : (
                    <Link onClick={onClick} to={link}>
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

    handleMouseOver = () => console.log('yeboi');

    handleMouseLeave = () => this.setState({ hover: false });
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { colourCode }
        }
    }
}) => ({
    colourCode: colourCode || '#e10512'
});

export default withRouter(connect(mapStateToProps)(MenuItemContainer));
