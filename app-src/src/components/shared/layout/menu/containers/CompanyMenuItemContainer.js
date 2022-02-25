import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getCompanyColour } from 'helpers/generic';
import { toggleMobileMenu } from 'actions/shared/mobile/sync/toggleMobileMenu';
import defaultStyles from 'constants/defaultStyles';
import {
    selectCompanyColourCode,
    selectIsBolsterLogoDark,
} from '../../../../../selectors/companyAdmin/companySettings';
import { selectIsMobile } from '../../../../../selectors/shared/mobile';
import { selectCompanyUserID } from '../../../../../selectors/companyAdmin/companyUsers';

const MenuItemContainer = ({
    location,
    link,
    children,
    external = false,
    logout = false,
    onClick = () => {},
    base = false,
    history,
}) => {
    const dispatch = useDispatch();
    const colourCode = useSelector(selectCompanyColourCode) || '';
    const isBolsterLogoDark = useSelector(selectIsBolsterLogoDark);
    const onMobile = useSelector(selectIsMobile);
    const companyUserID = useSelector(selectCompanyUserID);

    const [hover, setHover] = useState(false);

    const route = location.pathname.toLowerCase();

    const isActive = base
        ? link.toLowerCase() === route
        : route.toLowerCase().includes(link.toLowerCase());

    const textColor = isBolsterLogoDark && !!companyUserID ? 'black' : 'white';

    const companyColour = !companyUserID ? defaultStyles.colourCode : getCompanyColour(colourCode);

    const handleLogout = e => {
        e.preventDefault();
        if (logout) {
            localStorage.setItem('token', '');

            history.replace('/auth/login');
        }
    };

    const handleToggleMobileMenu = e => {
        e.preventDefault();
        if (onMobile) {
            dispatch(toggleMobileMenu());
        }
    };

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
            onClick={handleToggleMobileMenu}
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

export default withRouter(MenuItemContainer);
