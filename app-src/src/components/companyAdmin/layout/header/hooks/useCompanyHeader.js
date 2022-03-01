import { useSelector } from 'react-redux';

import { getCompanyColour } from 'helpers/generic';

import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectJwtData } from 'selectors/shared/jwt';

import useGetCompanyNotifications from 'hooks/useGetCompanyNotifications';

export const useCompanyHeader = () => {
    const company = useSelector(selectCompanySettings);
    const { companyUserID } = useSelector(selectJwtData);

    const { totalRequests, unreadMessageCount } = useGetCompanyNotifications();

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
