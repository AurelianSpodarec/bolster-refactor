import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getCompanyColour } from 'helpers/generic';

import { logout } from 'actions/shared/auth/sync/logout';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectJwtData } from 'selectors/shared/jwt';
import { selectProfile } from 'selectors/shared/profile';

export const useHeaderProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const profile = useSelector(selectProfile);
    const company = useSelector(selectCompanySettings);
    const { companyUserID } = useSelector(selectJwtData);

    const companyColour = getCompanyColour(company.companyColour);

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout());
        history.replace('/auth/login');
    };

    return {
        companyColour,
        companyUserID,
        profile,
        handleLogout,
    };
};

export default useHeaderProfile;
