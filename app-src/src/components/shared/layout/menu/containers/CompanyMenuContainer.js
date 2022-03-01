import React, { useState, useEffect, useMemo } from 'react';
import { usePrevious } from '../../../../../helpers/hooks';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CompanyMenu from '../presentational/CompanyMenu';
import { isEmpty } from 'helpers/generic';
import { companyNavMenuItems } from '../../../../../constants/companyAdmin/menuItems';
import useGetNotifications from '../../../../../hooks/useGetCompanyNotifications';

const CompanyMenuContainer = ({
    subscriptions,
    subscriptions: { startOn, hasUnpaidServiceInvoice },
    hasInitiallyFetched,
    isClientAccess,
    users,
    companyUserID,
}) => {
    if (!hasInitiallyFetched) return null;

    const isCompanySelection = location.pathname.includes('company/company-selection');
    const isCompanyUser = !!companyUserID;
    const isSubscribed = !isEmpty(subscriptions) || (!hasUnpaidServiceInvoice && !!startOn);
    const isCompanyUserOrSelecting = isCompanySelection || !isCompanyUser;

    const [shouldRestrictPayments, setShouldRestrictPayments] = useState(false);

    const { unreadMessageCount, unreadReleaseNoteCount, totalRequests, unreadCount } =
        useGetNotifications();

    const prevUsers = usePrevious({ users });

    useEffect(() => {
        if (users && users[companyUserID] && !prevUsers[companyUserID]) {
            setShouldRestrictPayments(users[companyUserID].shouldRestrictPayments);
        }
    }, [users]);

    const formattedCompanyNavMenuItems = useMemo(
        () =>
            companyNavMenuItems
                .filter(item => {
                    console.log(isSubscribed);
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
