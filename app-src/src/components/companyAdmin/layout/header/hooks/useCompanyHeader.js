import { useDispatch, useSelector } from 'react-redux';

import { getCompanyColour } from 'helpers/generic';

import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectJwtData } from 'selectors/shared/jwt';

import useGetCompanyNotifications from 'hooks/useGetCompanyNotifications';
import { selectIsMobile } from '../../../../../selectors/shared/mobile';
import { toggleMobileMenu as toggleMobileMenuAction } from 'actions/shared/mobile/sync/toggleMobileMenu';

export const useCompanyHeader = () => {
    const dispatch = useDispatch();

    const company = useSelector(selectCompanySettings);
    const { companyUserID, companyID } = useSelector(selectJwtData);
    const { totalRequests, unreadMessageCount } = useGetCompanyNotifications();

    const isMobile = useSelector(selectIsMobile);

    const companyColour = getCompanyColour(company.companyColour);
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
        unreadMessageCount,
        isMobile,
        toggleMobileMenu,
    };
};

export default useCompanyHeader;
