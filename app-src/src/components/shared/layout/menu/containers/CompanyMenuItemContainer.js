import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class MenuItemContainer extends Component {
    state = {
        hover: false
    };

    render() {
        const { hover } = this.state;
        const {
            location,
            link,
            children,
            external = false,
            logout = false,
            onClick = () => {},
            base = false,
            colourCode,
            isBolsterLogoDark
        } = this.props;
        const route = location.pathname.toLowerCase();
        const isActive = base
            ? link.toLowerCase() === route
            : route.toLowerCase().includes(link.toLowerCase());

        let textColor = 'white';

        if (isBolsterLogoDark) textColor = 'black';

        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                className={`item ${isActive ? 'active' : ''} custom-hover`}
                style={
                    isActive
                        ? { backgroundColor: colourCode, color: textColor }
                        : hover
                        ? { backgroundColor: colourCode, color: textColor }
                        : {}
                }
            >
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

    handleMouseEnter = () => this.setState({ hover: true });

    handleMouseLeave = () => this.setState({ hover: false });
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { colourCode, isBolsterLogoDark }
        }
    }
}) => ({
    colourCode: colourCode || '#e10512',
    isBolsterLogoDark
});

export default withRouter(connect(mapStateToProps)(MenuItemContainer));
