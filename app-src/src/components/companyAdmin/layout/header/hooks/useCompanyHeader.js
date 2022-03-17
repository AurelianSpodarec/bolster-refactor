import { useDispatch, useSelector } from 'react-redux';
import useGetCompanyNotifications from 'hooks/useGetCompanyNotifications';

import { getCompanyColour } from 'helpers/generic';

import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectJwtData } from 'selectors/shared/jwt';
import { selectIsMobile } from '../../../../../selectors/shared/mobile';
import { selectSubscriptions } from '../../../../../selectors/superAdmin/companySubscription';

import { toggleMobileMenu as toggleMobileMenuAction } from 'actions/shared/mobile/sync/toggleMobileMenu';
import { isEmpty } from 'helpers/generic';

export const useCompanyHeader = () => {
    const dispatch = useDispatch();

    const company = useSelector(selectCompanySettings);
    const { companyUserID, companyID } = useSelector(selectJwtData);
    const {
        totalRequests,
        unreadMessageCount,
        unreadCount,
        companyAlertsCount,
        drawingExpiryMessagesCount,
    } = useGetCompanyNotifications();

    const notificationCount =
        companyAlertsCount + unreadCount + unreadMessageCount + drawingExpiryMessagesCount;

    const isMobile = useSelector(selectIsMobile);
    const companyColour = getCompanyColour(company.companyColour);

    const subscriptions = useSelector(selectSubscriptions);
    const isSubscribed =
        !isEmpty(subscriptions) ||
        (!subscriptions.hasUnpaidServiceInvoice && !!subscriptions.startOn);

    const isCompanySelected = !!companyID;

    const toggleMobileMenu = () => {
        dispatch(toggleMobileMenuAction());
    };

    return {
        company,
        companyColour,
        companyUserID,
        isCompanySelected,
        totalRequests,
        notificationCount,
        isMobile,
        toggleMobileMenu,
        isSubscribed,
    };
};

export default useCompanyHeader;
