import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import search from 'reducers/companyAdmin/search';

import {
    selectMessageCentreIsFetching,
    selectMessageCentreError,
    selectSystemMessages,
    selectCompanyAlerts,
    selectOpertiveAlerts,
    selectDrawingExpiryMessages,
    selectSelectedTab,
} from 'selectors/companyAdmin/messageCentre';

const useMessageCentreTable = () => {
    const selectedTab = useSelector(selectSelectedTab);

    const isFetching = useSelector(selectMessageCentreIsFetching);
    const error = useSelector(selectMessageCentreError);

    const systemMessages = Object.values(useSelector(selectSystemMessages));
    const companyAlerts = Object.values(useSelector(selectCompanyAlerts));
    const operativeAlerts = Object.values(useSelector(selectOpertiveAlerts));
    const drawingExpiry = Object.values(useSelector(selectDrawingExpiryMessages));

    const [searchTerm, setSearchTerm] = useState('');

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

    return {
        selectedTab,
        messages,
        isFetching,
        error,
        searchTerm,
        handleSearch,
    };
};

export default useMessageCentreTable;
