import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
    selectMessageCentreIsFetching,
    selectMessageCentreError,
    selectSystemMessages,
    selectCompanyAlerts,
    selectOpertiveAlerts,
} from 'selectors/companyAdmin/messageCentre';

const useMessageCentreTable = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const isFetching = useSelector(selectMessageCentreIsFetching);
    const error = useSelector(selectMessageCentreError);

    const systemMessages = Object.values(useSelector(selectSystemMessages));
    const companyAlerts = Object.values(useSelector(selectCompanyAlerts));
    const operativeAlerts = Object.values(useSelector(selectOpertiveAlerts));

    const messageLookup = {
        0: systemMessages,
        1: companyAlerts,
        2: operativeAlerts,
        3: [],
    };

    return { selectedTab, setSelectedTab, messages: messageLookup[selectedTab], isFetching, error };
};

export default useMessageCentreTable;
