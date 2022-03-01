import React, { useState } from 'react';
import useNav from '../_hooks/useNav';
import useNavOverflow from '../_hooks/useNavOverflow';
import { Link } from 'react-router-dom';

import SubNavMenuLink from '../containers/SubNavMenuLink';

const MenuItem = ({
    item: { name, link, showNotificationBadge, icon, subNavItems },
    formattedSubNavItems,
}) => {
    const [hover, setHover] = useState(false);

    const { subNavRef, isSubNavOverflowing } = useNavOverflow(hover);

    const { isActive, textColour, companyColour, isBolsterLogoDark } = useNav(subNavItems, link);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="item custom-hover"
            style={
                isActive
                    ? {
                          color: isBolsterLogoDark ? 'white' : textColour,
                      }
                    : {}
            }
        >
            <div className="link-wrapper">
                <img src={icon} alt={name} />

                {link ? <Link to={link}>{name}</Link> : <span>{name}</span>}

                {showNotificationBadge && <div className="notification-badge" />}
            </div>

            {hover ? (
                <>
                    <div
                        className="hover-indicator fade-in"
                        style={{
                            backgroundColor: companyColour,
                        }}
                    />

                    {!!formattedSubNavItems?.length && (
                        <div
                            ref={subNavRef}
                            className={`sub-nav fade-in ${isSubNavOverflowing ? 'bottom' : ''}`}
                        >
                            {formattedSubNavItems.map((item, i) => (
                                <SubNavMenuLink key={i} item={item} companyColour={companyColour} />
                            ))}
                        </div>
                    )}
                </>
            ) : null}

            <div
                className={`active-background  ${isActive ? 'active' : ''}`}
                style={
                    isActive
                        ? {
                              backgroundColor: companyColour,
                          }
                        : {}
                }
            />
        </div>
    );
};

export default MenuItem;
