import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getCompanyColour } from 'helpers/generic';
import { toggleMobileMenu } from 'actions/shared/mobile/sync/toggleMobileMenu';

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
        const companyColour = getCompanyColour(colourCode);
        if (isBolsterLogoDark) textColor = 'black';

        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                className={`item ${isActive ? 'active' : ''} custom-hover`}
                style={
                    isActive
                        ? { backgroundColor: companyColour, color: textColor }
                        : hover
                        ? { backgroundColor: companyColour, color: textColor }
                        : {}
                }
                onClick={() => this._toggleMobileMenu()}
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

    _toggleMobileMenu = () => {
        const { onMobile, toggleMobileMenu } = this.props;
        if (onMobile) {
            toggleMobileMenu();
        } else {
            return;
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { colourCode, isBolsterLogoDark }
        }
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    colourCode: colourCode || '',
    isBolsterLogoDark,
    onMobile
});

const mapDispatchToProps = dispatch => ({
    toggleMobileMenu: () => dispatch(toggleMobileMenu())
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MenuItemContainer)
);
