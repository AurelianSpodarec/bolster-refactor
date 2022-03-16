import { useSelector } from 'react-redux';

import { selectSuperAdminBuReports } from '../selectors/superAdmin/buReports';
import { selectSuperAdminContactSubmissions } from '../selectors/superAdmin/contactSubmissions';

const useGetCompanyNotifications = () => {
    const superAdminBugReports = useSelector(selectSuperAdminBuReports) || {};
    const superAdminContactSubmissions = useSelector(selectSuperAdminContactSubmissions) || {};

    const unreadSuperAdminBugReports = Object.values(superAdminBugReports).reduce(
        (result, { isRead }) => result + (!isRead ? 1 : 0),
        0,
    );

    const unreadSuperAdminContactSubmissions = Object.values(superAdminContactSubmissions).reduce(
        (result, { contacted }) => result + (!contacted ? 1 : 0),
        0,
    );

    return {
        unreadSuperAdminBugReports,
        unreadSuperAdminContactSubmissions,
    };
};

export default useGetCompanyNotifications;
