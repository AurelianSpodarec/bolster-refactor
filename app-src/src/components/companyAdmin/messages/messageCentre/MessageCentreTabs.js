import React, { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import setSelectedTab from 'actions/companyAdmin/messageCentre/async/setSeletedTab';
import {
    selectCompanyAlertsCount,
    selectDrawingExpiryMessagesCount,
    selectSystemMessagesCount,
} from 'selectors/companyAdmin/messageCentre';

const MessageCentreTabs = ({ selectedTab }) => {
    const dispatch = useDispatch();

    const setSelected = tab => {
        dispatch(setSelectedTab(tab));
    };

    const systemMessagesCount = useSelector(selectSystemMessagesCount);
    const companyAlertsCount = useSelector(selectCompanyAlertsCount);
    const drawingExpiryMessagesCount = useSelector(selectDrawingExpiryMessagesCount);

    const tabs = useMemo(() => {
        return [
            { name: 'System Messages', value: 0, unreadCount: systemMessagesCount },
            { name: 'Company Alerts', value: 1, unreadCount: companyAlertsCount },
            { name: 'Operative Alerts', value: 2, unreadCount: 0 },
            { name: 'Drawing Expiry', value: 3, unreadCount: drawingExpiryMessagesCount },
        ];
    }, [systemMessagesCount, companyAlertsCount, drawingExpiryMessagesCount]);

    return (
        <div className="tab-wrapper size-lg-12">
            {tabs.map((tab, i) => (
                <button
                    key={i}
                    className={`tab-item ${selectedTab === tab.value ? 'active' : ''}`}
                    onClick={() => setSelected(tab.value)}
                >
                    {tab.name}{' '}
                    {tab.unreadCount ? <span className="notification">{tab.unreadCount}</span> : ''}
                </button>
            ))}
        </div>
    );
};

export default MessageCentreTabs;
