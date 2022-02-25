import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getCompanyColour } from 'helpers/generic';
import { toggleMobileMenu } from 'actions/shared/mobile/sync/toggleMobileMenu';
import defaultStyles from 'constants/defaultStyles';

const MenuItemContainer = ({
    location,
    link,
    children,
    external = false,
    logout = false,
    onClick = () => {},
    base = false,
    colourCode,
    isBolsterLogoDark,
    companyUserID,
    onMobile,
    toggleMobileMenu,
    history,
}) => {
    const [hover, setHover] = useState(false);

    const route = location.pathname.toLowerCase();

    const isActive = base
        ? link.toLowerCase() === route
        : route.toLowerCase().includes(link.toLowerCase());

    let textColor = 'white';

    const companyColour = !companyUserID ? defaultStyles.colourCode : getCompanyColour(colourCode);

    const handleLogout = e => {
        e.preventDefault();
        if (logout) {
            localStorage.setItem('token', '');

            history.replace('/auth/login');
        }
    };

    const _toggleMobileMenu = () => {
        if (onMobile) {
            toggleMobileMenu();
        }
    };

    if (isBolsterLogoDark && !!companyUserID) textColor = 'black';

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`item ${isActive ? 'active' : ''} custom-hover`}
            style={
                isActive
                    ? {
                          backgroundColor: companyColour,
                          color: isBolsterLogoDark ? 'white' : textColor,
                      }
                    : hover
                    ? {
                          backgroundColor: companyColour,
                          color: isBolsterLogoDark ? 'white' : textColor,
                      }
                    : {}
            }
            onClick={() => _toggleMobileMenu()}
        >
            {external ? (
                <a href={link}>{children}</a>
            ) : logout ? (
                <Link onClick={handleLogout} to={link}>
                    {children}
                </Link>
            ) : (
                <Link onClick={onClick} to={link}>
                    {children}
                </Link>
            )}
        </div>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { colourCode, isBolsterLogoDark },
        },
    },
    shared: {
        mobileReducer: { onMobile },
        decodeJWTReducer: {
            jwtData: { companyUserID },
        },
    },
}) => ({
    colourCode: colourCode || '',
    isBolsterLogoDark,
    onMobile,
    companyUserID,
});

const mapDispatchToProps = dispatch => ({
    toggleMobileMenu: () => dispatch(toggleMobileMenu()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer));
