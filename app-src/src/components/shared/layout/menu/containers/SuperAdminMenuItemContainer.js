import React, { useMemo } from 'react';
import useGetSuperAdminNotifications from '../../../../../hooks/useGetSuperAdminNotifications';

import MenuItem from '../presentational/MenuItem';

const SuperAdminMenuItemContainer = ({ item, hover, setHoveredItem }) => {
    const { unreadSuperAdminBugReports, unreadSuperAdminContactSubmissions } =
        useGetSuperAdminNotifications();

    const formattedSubNavItems = useMemo(
        () =>
            item.subNavItems?.length &&
            item.subNavItems.map(item => {
                if (item.link === '/admin/bug-reports') {
                    return { ...item, notificationCount: unreadSuperAdminBugReports };
                }

                if (item.link === '/admin/contact-submissions') {
                    return { ...item, notificationCount: unreadSuperAdminContactSubmissions };
                }

                return item;
            }),
        [item.subNavItems, unreadSuperAdminBugReports, unreadSuperAdminContactSubmissions],
    );

    return (
        <MenuItem
            item={item}
            formattedSubNavItems={formattedSubNavItems}
            hover={hover}
            setHoveredItem={setHoveredItem}
        />
    );
};

export default SuperAdminMenuItemContainer;
