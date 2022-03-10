import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { selectJwtData } from 'selectors/shared/jwt';

export const useShouldRestrictPayments = () => {
    const companyUsers = useSelector(selectCompanyUsers);
    const { companyUserID } = useSelector(selectJwtData);

    const [shouldRestrictPayments, setShouldRestrictPayments] = useState(false);

    useEffect(() => {
        if (companyUsers && companyUsers[companyUserID]) {
            setShouldRestrictPayments(companyUsers[companyUserID].shouldRestrictPayments);
        }
    }, [companyUsers, companyUserID]);

    return shouldRestrictPayments;
};

export default useShouldRestrictPayments;
