import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useWindowDimensions } from '../../../../../helpers/hooks';

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

import SubNavMenuLink from './SubNavMenuLink';
import { GENERATE_QR_CODES } from '../../../../../constants/shared/modalTypes';
import { showModal } from '../../../../../actions/shared/generic/modals/sync/showModal';
import useGetNotifications from '../../../../../hooks/useGetNotifications';

const MenuItemContainer = ({
    item: { name, link, icon, subNavItems, showNotificationBadge },
    location,
    external = false,
    isSubscribed,
    isCompanyUserOrSelecting,
    isClientAccess,
    shouldRestrictPayments,
}) => {
    const dispatch = useDispatch();
    const { height } = useWindowDimensions();

    const {
        unreadCount,
        totalRequests,
        unreadMessageCount,
        unreadReleaseNoteCount,
        unreadSuperAdminBugReports,
        unreadSuperAdminContactSubmissions,
    } = useGetNotifications();

    const colourCode = useSelector(selectCompanyColourCode) || '';
    const isBolsterLogoDark = useSelector(selectIsBolsterLogoDark);
    const onMobile = useSelector(selectIsMobile);
    const companyUserID = useSelector(selectCompanyUserID);

    const [hover, setHover] = useState(false);

    const subNavRef = useRef(null);
    const [isSubNavOverflowing, setIsSubNavOverflowing] = useState(false);

    const route = location.pathname.toLowerCase();

    const handleGenerateQRCodesModal = e => {
        e.preventDefault();

        dispatch(showModal(GENERATE_QR_CODES));
    };

    const checkIfActive = () => {
        if (link?.toLowerCase() === route) {
            return true;
        }
        if (subNavItems?.length) {
            return subNavItems.find(item => item.link.toLowerCase() === route);
        }
        if (route.split('/')[1] === link.split('/')[1]) {
            return route.split('/').length <= 2;
        }

        return false;
    };

    const isActive = checkIfActive();

    const textColor = isBolsterLogoDark && !!companyUserID ? 'black' : 'white';

    const companyColour = !companyUserID ? defaultStyles.colourCode : getCompanyColour(colourCode);

    const handleToggleMobileMenu = e => {
        e.preventDefault();
        if (onMobile) {
            dispatch(toggleMobileMenu());
        }
    };

    const formattedSubNavItems = useMemo(
        () =>
            subNavItems?.length &&
            subNavItems
                .filter(item => {
                    if (isSubscribed) {
                        if (isCompanyUserOrSelecting && item.userSelectRestriction) {
                            return false;
                        }
                        if (shouldRestrictPayments && item.paymentRestriction) {
                            return false;
                        }
                        if (!isClientAccess && item.clientAccessRestriction) {
                            return false;
                        }
                    } else {
                        if (item.subscriptionRestriction) {
                            return false;
                        }
                    }

                    return true;
                })
                .map(item => {
                    if (item.link === '/company/generate-qr-codes') {
                        return {
                            ...item,
                            onClick: handleGenerateQRCodesModal,
                        };
                    }

                    if (item.link === '/company/reports') {
                        return { ...item, notificationCount: unreadCount };
                    }

                    if (item.link === '/company/tools/transfer-requests') {
                        return { ...item, notificationCount: totalRequests };
                    }

                    if (item.link === '/company/message-centre') {
                        return { ...item, notificationCount: unreadMessageCount };
                    }

                    if (item.link === '/company/release-notes') {
                        return { ...item, notificationCount: unreadReleaseNoteCount };
                    }

                    if (item.link === '/admin/bug-reports') {
                        return { ...item, notificationCount: unreadSuperAdminBugReports };
                    }

                    if (item.link === '/admin/contact-submissions') {
                        return { ...item, notificationCount: unreadSuperAdminContactSubmissions };
                    }

                    return item;
                }),
        [
            subNavItems,
            isCompanyUserOrSelecting,
            isSubscribed,
            shouldRestrictPayments,
            isClientAccess,
        ],
    );

    useEffect(() => {
        if (subNavRef.current) {
            const rect = subNavRef.current.getBoundingClientRect();
            if (rect.bottom + rect.height > height) {
                setIsSubNavOverflowing(true);
            } else {
                setIsSubNavOverflowing(false);
            }
        }
    }, [subNavRef.current, height, hover]);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="item custom-hover"
            style={
                isActive
                    ? {
                          color: isBolsterLogoDark ? 'white' : textColor,
                      }
                    : {}
            }
            onClick={handleToggleMobileMenu}
        >
            <div className="link-wrapper">
                <img src={icon} alt={name} />

                {external ? (
                    <a href={link}>{name}</a>
                ) : link ? (
                    <Link to={link}>{name}</Link>
                ) : (
                    <span>{name}</span>
                )}

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

                    {!!subNavItems?.length && (
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

export default withRouter(MenuItemContainer);
