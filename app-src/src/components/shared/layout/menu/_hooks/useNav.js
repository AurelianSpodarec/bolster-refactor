import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    selectCompanyColourCode,
    selectIsBolsterLogoDark,
} from '../../../../../selectors/companyAdmin/companySettings';
import { selectCompanyUserID } from '../../../../../selectors/companyAdmin/companyUsers';
import defaultStyles from '../../../../../constants/defaultStyles';
import { getCompanyColour } from '../../../../../helpers/generic';
import fetchLatestAppVersion from '../../../../../actions/companyAdmin/app/async/fetchLatestAppVersion';

const useNav = (subNavItems, link) => {
    const dispatch = useDispatch();

    const location = useLocation();
    const colourCode = useSelector(selectCompanyColourCode) || '';
    const isBolsterLogoDark = useSelector(selectIsBolsterLogoDark);
    const companyUserID = useSelector(selectCompanyUserID);

    const textColour = isBolsterLogoDark && !!companyUserID ? 'black' : 'white';
    const companyColour = !companyUserID ? defaultStyles.colourCode : getCompanyColour(colourCode);

    const route = location.pathname.toLowerCase();

    useEffect(() => {
        dispatch(fetchLatestAppVersion());
    }, [dispatch]);

    const checkIfActive = () => {
        if (link?.toLowerCase() === route) {
            return true;
        }
        if (subNavItems?.length) {
            return subNavItems.find(item => item.link.toLowerCase() === route);
        }

        return false;
    };

    const isActive = checkIfActive();

    return { isActive, textColour, companyColour, isBolsterLogoDark };
};

export default useNav;
