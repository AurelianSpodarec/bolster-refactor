import React, { useEffect, useMemo } from 'react';
import useGetSuperAdminNotifications from '../../../../../hooks/useGetSuperAdminNotifications';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SuperAdminMenu from '../presentational/SuperAdminMenu';
import fetchBugReportList from 'actions/superAdmin/bugReports/fetchBugReportList';
import { superAdminNavMenuItems } from '../../../../../constants/superAdmin/menuItems';

const SuperAdminMenuContainer = ({ fetchBugReportList }) => {
    const { unreadSuperAdminBugReports, unreadSuperAdminContactSubmissions } =
        useGetSuperAdminNotifications();

    useEffect(() => {
        fetchBugReportList();
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
    return <SuperAdminMenu superAdminNavMenuItems={formattedNavItems} />;
};

export default withRouter(connect(null, { fetchBugReportList })(SuperAdminMenuContainer));
