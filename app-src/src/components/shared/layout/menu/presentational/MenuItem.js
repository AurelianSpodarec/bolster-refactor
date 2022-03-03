import React, { useState } from 'react';
import useNav from '../_hooks/useNav';
import useNavOverflow from '../_hooks/useNavOverflow';
import { Link } from 'react-router-dom';

import SubNavMenuLink from '../containers/SubNavMenuLink';
import { selectIsMobile } from '../../../../../selectors/shared/mobile';
import { useSelector } from 'react-redux';

const MenuItem = ({
    item: { name, link, showNotificationBadge, icon, subNavItems },
    formattedSubNavItems,
    shouldUseCompanyColours,
}) => {
    const [hover, setHover] = useState(false);
    const isMobile = useSelector(selectIsMobile);

    const { subNavRef, isSubNavOverflowing } = useNavOverflow(hover);

    const { isActive, textColour, companyColour, isBolsterLogoDark } = useNav(subNavItems, link);

    return (
        <Link
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="item custom-hover"
            style={
                isActive
                    ? {
                          color: isBolsterLogoDark ? 'black' : textColour,
                      }
                    : {}
            }
            to={link}
        >
            <div className="link-wrapper">
                <img
                    src={icon}
                    alt={name}
                    className="image"
                    style={
                        isActive && isBolsterLogoDark
                            ? {
                                  webkitFilter: 'invert(100%)',
                                  filter: 'invert(100%)',
                              }
                            : {}
                    }
                />

                <span>{name}</span>

                {showNotificationBadge && <div className="notification-badge" />}
            </div>

            {hover || (isMobile && isActive) ? (
                <>
                    <div
                        className="hover-indicator fade-in"
                        style={
                            (isActive && shouldUseCompanyColours) ||
                            (hover && shouldUseCompanyColours)
                                ? { backgroundColor: companyColour }
                                : {}
                        }
                    />

                    {!!formattedSubNavItems?.length && (
                        <div
                            ref={subNavRef}
                            className={`sub-nav fade-in ${isSubNavOverflowing ? 'bottom' : ''}`}
                        >
                            {formattedSubNavItems.map((item, i) => (
                                <SubNavMenuLink
                                    key={i}
                                    item={item}
                                    companyColour={companyColour}
                                    shouldUseCompanyColours={shouldUseCompanyColours}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : null}

            <div
                className={`active-background  ${isActive ? 'active' : ''}`}
                style={
                    (isActive && shouldUseCompanyColours) || (hover && shouldUseCompanyColours)
                        ? { backgroundColor: companyColour }
                        : {}
                }
            />
        </Link>
    );
};

export default MenuItem;
