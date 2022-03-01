import { useSelector } from 'react-redux';

import { getCompanyColour } from 'helpers/generic';

import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectJwtData } from 'selectors/shared/jwt';

import useGetNotifications from 'hooks/useGetNotifications';

export const useCompanyHeader = () => {
    const company = useSelector(selectCompanySettings);
    const { companyUserID } = useSelector(selectJwtData);

    const { totalRequests, unreadMessageCount } = useGetNotifications();

    const companyColour = getCompanyColour(company.companyColour);
    const isCompanySelection = location.pathname.includes('company/company-selection');

    return {
        company,
        companyColour,
        companyUserID,
        isCompanySelection,
        totalRequests,
        unreadMessageCount,
    };
};

export default useCompanyHeader;
