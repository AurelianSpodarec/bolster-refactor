import React, { useState, useEffect, useMemo } from 'react';
import { usePrevious } from '../../../../../helpers/hooks';
import { useHistory, withRouter } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import CompanyMenu from '../presentational/CompanyMenu';
import { isEmpty } from 'helpers/generic';
import { companyNavMenuItems } from '../../../../../constants/companyAdmin/menuItems';
import useGetCompanyNotifications from '../../../../../hooks/useGetCompanyNotifications';
import { logout } from 'actions/shared/auth/sync/logout';

const CompanyMenuContainer = ({
    subscriptions,
    subscriptions: { startOn, hasUnpaidServiceInvoice },
    hasInitiallyFetched,
    isClientAccess,
    users,
    companyUserID,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    if (!hasInitiallyFetched) return null;

    const isCompanySelection = location.pathname.includes('company/company-selection');
    const isCompanyUser = !!companyUserID;
    const isSubscribed = !isEmpty(subscriptions) || (!hasUnpaidServiceInvoice && !!startOn);
    const isCompanyUserOrSelecting = isCompanySelection || !isCompanyUser;

    const [shouldRestrictPayments, setShouldRestrictPayments] = useState(false);

    const { unreadMessageCount, unreadReleaseNoteCount, totalRequests, unreadCount } =
        useGetCompanyNotifications();

    const prevUsers = usePrevious({ users });

    useEffect(() => {
        if (users && users[companyUserID] && !prevUsers[companyUserID]) {
            setShouldRestrictPayments(users[companyUserID].shouldRestrictPayments);
        }
    }, [users]);

    const handleLogout = e => {
        e.preventDefault();

        dispatch(logout());

        history.replace('/auth/login');
    };

    const formattedCompanyNavMenuItems = useMemo(
        () =>
            companyNavMenuItems
                .filter(item => {
                    if (isSubscribed) {
                        if (!isCompanyUserOrSelecting && item.name === 'Logout') {
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

                        if (isCompanyUserOrSelecting && item.userSelectRestriction) {
                            return false;
                        }
                    }

                    return true;
                })
                .map(item => {
                    if (
                        (item.name === 'Tools' && !!unreadMessageCount) ||
                        (item.name === 'Tools' && !!unreadReleaseNoteCount)
                    ) {
                        return { ...item, showNotificationBadge: true };
                    }

                    if (item.name === 'Sites' && !!totalRequests) {
                        return { ...item, showNotificationBadge: true };
                    }
                    if (item.name === 'Reports' && !!unreadCount) {
                        return { ...item, showNotificationBadge: true };
                    }
                    if (item.name === 'Logout') {
                        return {
                            ...item,
                            onClick: handleLogout,
                        };
                    }

                    return { ...item, showNotificationBadge: false };
                }),
        [
            companyNavMenuItems,
            isCompanyUserOrSelecting,
            isSubscribed,
            shouldRestrictPayments,
            isClientAccess,
            unreadMessageCount,
            unreadReleaseNoteCount,
            totalRequests,
            unreadCount,
        ],
    );

    return (
        <CompanyMenu
            companyNavMenuItems={formattedCompanyNavMenuItems}
            isSubscribed={isSubscribed}
            isCompanyUserOrSelecting={isCompanyUserOrSelecting}
            isClientAccess={isClientAccess}
            shouldRestrictPayments={shouldRestrictPayments}
        />
    );
};
const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: { companySettings },
        creditsReducer: { credits },
        subscriptionsReducer: { hasInitiallyFetched, subscriptions },
        companyUsersReducer: { users },
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { headquartersCompanyID, isClientAccess, companyUserID },
        },
    },
}) => {
    const totalCredits = Object.values(credits).reduce((a, b) => a + b.quantity, 0);

    return {
        hasInitiallyFetched,
        subscriptions,
        totalCredits,
        isFromHeadquarters: !!headquartersCompanyID,
        isClientAccess,
        companyUserID,
        users,
        companySettings,
    };
};

export default withRouter(connect(mapStateToProps, null)(CompanyMenuContainer));
