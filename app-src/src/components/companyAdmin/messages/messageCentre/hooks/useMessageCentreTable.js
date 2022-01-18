import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fetchCompanyAlerts from 'actions/companyAdmin/messageCentre/async/fetchCompanyAlerts';
import fetchDrawingExpiryMessages from 'actions/companyAdmin/messageCentre/async/fetchDrawingExpiryMessages';
import fetchOperativeAlerts from 'actions/companyAdmin/messageCentre/async/fetchOperativeAlerts';
import fetchSystemMessages from 'actions/companyAdmin/messageCentre/async/fetchSystemMessages';
import {
    selectMessageCentreIsFetching,
    selectMessageCentreError,
    selectSystemMessages,
    selectCompanyAlerts,
    selectOpertiveAlerts,
    selectDrawingExpiryMessages,
    selectSelectedTab,
} from 'selectors/companyAdmin/messageCentre';

import { MESSAGE_CENTRE_TABS } from 'constants/companyAdmin/enums';

const useMessageCentreTable = () => {
    const dispatch = useDispatch();

    const selectedTab = useSelector(selectSelectedTab);

    const isFetching = useSelector(selectMessageCentreIsFetching);
    const error = useSelector(selectMessageCentreError);

    const systemMessages = Object.values(useSelector(selectSystemMessages));
    const companyAlerts = Object.values(useSelector(selectCompanyAlerts));
    const operativeAlerts = Object.values(useSelector(selectOpertiveAlerts));
    const drawingExpiry = Object.values(useSelector(selectDrawingExpiryMessages));

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        switch (selectedTab) {
            case MESSAGE_CENTRE_TABS.SYSTEM_MESSAGES:
                return dispatch(fetchSystemMessages());
            case MESSAGE_CENTRE_TABS.COMPANY_ALERTS:
                return dispatch(fetchCompanyAlerts());
            case MESSAGE_CENTRE_TABS.OPERATIVE_ALERTS:
                return dispatch(fetchOperativeAlerts());
            case MESSAGE_CENTRE_TABS.DRAWING_EXPIRY:
                return dispatch(fetchDrawingExpiryMessages());
        }
    }, [selectedTab]);

    const messageLookup = {
        0: systemMessages,
        1: companyAlerts,
        2: operativeAlerts,
        3: drawingExpiry,
    };

    const handleSearch = (_, val) => {
        setSearchTerm(val);
    };

    const messages = useMemo(() => {
        if (searchTerm) {
            return messageLookup[selectedTab].filter(message => {
                for (let key in message) {
                    if (
                        typeof message[key] === 'string' &&
                        message[key].toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                        return true;
                    }
                }
            });
        } else {
            return messageLookup[selectedTab];
        }
    }, [searchTerm, selectedTab, messageLookup]);

    const shouldShowSearch = searchTerm || !!messages.length;

    return {
        selectedTab,
        messages,
        isFetching,
        error,
        searchTerm,
        handleSearch,
        shouldShowSearch,
    };
};

export default useMessageCentreTable;
