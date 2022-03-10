import React, { useEffect, useMemo } from 'react';
import useGetSuperAdminNotifications from '../../../../../hooks/useGetSuperAdminNotifications';

import { batch, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SuperAdminMenu from '../presentational/SuperAdminMenu';
import { superAdminNavMenuItems } from '../../../../../constants/superAdmin/menuItems';
import fetchAllContactSubmissions from '../../../../../actions/superAdmin/contactSubmissions/async/fetchAllContactSubmissions';
import fetchBugReportList from 'actions/superAdmin/bugReports/fetchBugReportList';
import { selectLatestAppVersion } from 'selectors/companyAdmin/app';

const SuperAdminMenuContainer = () => {
    const dispatch = useDispatch();

    const { unreadSuperAdminBugReports, unreadSuperAdminContactSubmissions } =
        useGetSuperAdminNotifications();
    const latestAppVersion = useSelector(selectLatestAppVersion);

    useEffect(() => {
        batch(() => {
            dispatch(fetchBugReportList());
            dispatch(fetchAllContactSubmissions());
        });
    }, []);

    const formattedNavItems = useMemo(
        () =>
            superAdminNavMenuItems.map(item => {
                if (item.name === 'Support') {
                    return {
                        ...item,
                        showNotificationBadge: !!unreadSuperAdminBugReports,
                    };
                }
                if (item.name === 'Contact') {
                    return {
                        ...item,
                        showNotificationBadge: !!unreadSuperAdminContactSubmissions,
                    };
                }
                return item;
            }),
        [superAdminNavMenuItems, unreadSuperAdminContactSubmissions, unreadSuperAdminBugReports],
    );
    return (
        <SuperAdminMenu
            superAdminNavMenuItems={formattedNavItems}
            latestAppVersion={latestAppVersion}
        />
    );
};

export default withRouter(SuperAdminMenuContainer);
