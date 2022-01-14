import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MESSAGE_CENTRE_TABS } from 'constants/companyAdmin/enums';

import {
    selectMessageCentreIsFetching,
    selectMessageCentreError,
    selectCompanyAlerts,
} from 'selectors/companyAdmin/messageCentre';
import fetchCompanyAlerts from 'actions/companyAdmin/messageCentre/async/fetchCompanyAlerts';

const useMessageCentreTable = () => {
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState(0);
    const [messages, setMessages] = useState([]);

    const isFetching = useSelector(selectMessageCentreIsFetching);
    const error = useSelector(selectMessageCentreError);

    const companyAlerts = useSelector(selectCompanyAlerts);

    useEffect(() => {
        if (selectedTab === MESSAGE_CENTRE_TABS.COMPANY_ALERTS) {
            dispatch(fetchCompanyAlerts());
        }
    }, [selectedTab]);

    return { selectedTab, setSelectedTab, messages, isFetching, error };
};

export default useMessageCentreTable;
