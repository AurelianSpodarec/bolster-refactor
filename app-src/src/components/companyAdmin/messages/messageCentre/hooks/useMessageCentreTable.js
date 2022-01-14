import { useSelector } from 'react-redux';

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

    const messageLookup = {
        0: systemMessages,
        1: companyAlerts,
        2: operativeAlerts,
        3: drawingExpiry,
    };

    return { selectedTab, messages: messageLookup[selectedTab], isFetching, error };
};

export default useMessageCentreTable;
