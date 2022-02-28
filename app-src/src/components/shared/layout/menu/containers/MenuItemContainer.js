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
    item: { name, link, icon, subNavItems },
    location,
    children,
    external = false,
    onClick = () => {},
    base = false,
}) => {
    const dispatch = useDispatch();
    const colourCode = useSelector(selectCompanyColourCode) || '';
    const isBolsterLogoDark = useSelector(selectIsBolsterLogoDark);
    const onMobile = useSelector(selectIsMobile);
    const companyUserID = useSelector(selectCompanyUserID);

    const [hover, setHover] = useState(false);

    const route = location.pathname.toLowerCase();

    const isActive = base
        ? link?.toLowerCase() === route
        : route.toLowerCase().includes(link?.toLowerCase())
        ? route.toLowerCase().includes(link?.toLowerCase())
        : subNavItems?.find(item => item.link.toLowerCase().includes(link?.toLowerCase()));

    const textColor = isBolsterLogoDark && !!companyUserID ? 'black' : 'white';

    const companyColour = !companyUserID ? defaultStyles.colourCode : getCompanyColour(colourCode);

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
                <a href={link}>{name}</a>
            ) : link ? (
                <Link onClick={onClick} to={link}>
                    {name}
                </Link>
            ) : (
                <span>{name}</span>
            )}
        </div>
    );
};

export default withRouter(MenuItemContainer);
('');
