import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useGetCompanyNotifications from '../../../../../hooks/useGetCompanyNotifications';

import { showModal } from '../../../../../actions/shared/generic/modals/sync/showModal';
import { GENERATE_QR_CODES } from '../../../../../constants/shared/modalTypes';
import MenuItem from '../presentational/MenuItem';

const CompanyMenuItemContainer = ({
    item,
    isSubscribed,
    isCompanyUserOrSelecting,
    isClientAccess,
    shouldRestrictPayments,
    hover,
    setHoveredItem,
}) => {
    const dispatch = useDispatch();

    const { unreadCount, totalRequests, unreadMessageCount, unreadReleaseNoteCount } =
        useGetCompanyNotifications();

    const handleGenerateQRCodesModal = e => {
        e.preventDefault();

        dispatch(showModal(GENERATE_QR_CODES));
    };

    const formattedSubNavItems = useMemo(
        () =>
            item.subNavItems?.length &&
            item.subNavItems
                .filter(item => {
                    if (isSubscribed) {
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

                    return item;
                }),
        [
            item.subNavItems,
            isCompanyUserOrSelecting,
            isSubscribed,
            shouldRestrictPayments,
            isClientAccess,
            unreadCount,
            totalRequests,
            unreadMessageCount,
            unreadReleaseNoteCount,
        ],
    );

    return (
        <MenuItem
            item={item}
            formattedSubNavItems={formattedSubNavItems}
            shouldUseCompanyColours
            hover={hover}
            setHoveredItem={setHoveredItem}
        />
    );
};

export default CompanyMenuItemContainer;
