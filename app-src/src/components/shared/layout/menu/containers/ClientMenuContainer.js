import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useGetClientNotifications from '../../../../../hooks/useGetClientNotifications';

import ClientMenu from '../presentational/ClientMenu';
import { clientNavMenuItems } from '../../../../../constants/client/menuItems';

const ClientMenuContainer = () => {
    const { isCompanyAdmin } = useSelector(mapStateToProps);
    const { unreadCount } = useGetClientNotifications();

    const formattedClientNavMenuItems = useMemo(
        () =>
            clientNavMenuItems.map(item => {
                if (item.link === '/client/reports') {
                    return {
                        ...item,
                        showNotificationBadge: !!unreadCount,
                    };
                }

                return item;
            }),
        [clientNavMenuItems, unreadCount],
    );
    return (
        <ClientMenu isCompany={isCompanyAdmin} clientNavMenuItems={formattedClientNavMenuItems} />
    );
};

const mapStateToProps = ({
    shared: {
        decodeJWTReducer: {
            jwtData: { isCompanyAdmin },
        },
    },
}) => ({
    isCompanyAdmin: isCompanyAdmin,
});

export default ClientMenuContainer;
