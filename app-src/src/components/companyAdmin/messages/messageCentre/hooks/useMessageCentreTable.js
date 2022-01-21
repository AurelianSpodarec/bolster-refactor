import { usePrevious } from 'helpers/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MESSAGE_CENTRE_TABS } from 'constants/companyAdmin/enums';

import markSystemMessagesAsRead from 'actions/companyAdmin/messageCentre/async/markSystemMessagesAsRead';
import markCompanyAlertsAsRead from 'actions/companyAdmin/messageCentre/async/markCompanyAlertsAsRead';
import markDrawingExpiryMessagesAsRead from 'actions/companyAdmin/messageCentre/async/markDrawingExpiryMessagesAsRead';

import fetchSystemMessages from 'actions/companyAdmin/messageCentre/async/fetchSystemMessages';
import fetchCompanyAlerts from 'actions/companyAdmin/messageCentre/async/fetchCompanyAlerts';
import fetchOperativeAlerts from 'actions/companyAdmin/messageCentre/async/fetchOperativeAlerts';
import fetchDrawingExpiryMessages from 'actions/companyAdmin/messageCentre/async/fetchDrawingExpiryMessages';

import {
    selectMessageCentreError,
    selectSystemMessages,
    selectCompanyAlerts,
    selectOperativeAlerts,
    selectDrawingExpiryMessages,
    selectSelectedTab,
    selectMessageCentreIsFetchingSystemMessages,
    selectMessageCentreIsFetchingCompanyAlerts,
    selectMessageCentreIsFetchingOperativeAlerts,
    selectMessageCentreIsFetchingDrawingExpiryMessages,
    selectSystemMessagesCount,
    selectCompanyAlertsCount,
    selectDrawingExpiryMessagesCount,
} from 'selectors/companyAdmin/messageCentre';
import { sortByDate } from 'helpers/sorts';

const { SYSTEM_MESSAGES, COMPANY_ALERTS, OPERATIVE_ALERTS, DRAWING_EXPIRY } = MESSAGE_CENTRE_TABS;

const useMessageCentreTable = () => {
    const dispatch = useDispatch();
    const selectedTab = useSelector(selectSelectedTab);

    const isFetchingSystemMessages = useSelector(selectMessageCentreIsFetchingSystemMessages);
    const isFetchingCompanyAlerts = useSelector(selectMessageCentreIsFetchingCompanyAlerts);
    const isFetchingOperativeAlerts = useSelector(selectMessageCentreIsFetchingOperativeAlerts);
    const isFetchingDrawingExpiryMessages = useSelector(
        selectMessageCentreIsFetchingDrawingExpiryMessages,
    );
    const isFetching =
        isFetchingSystemMessages ||
        isFetchingCompanyAlerts ||
        isFetchingOperativeAlerts ||
        isFetchingDrawingExpiryMessages;
    const error = useSelector(selectMessageCentreError);
    const [hasFetched, setHasFetched] = useState(false);

    const prevProps = usePrevious({ isFetching });

    const systemMessages = Object.values(useSelector(selectSystemMessages));
    const companyAlerts = Object.values(useSelector(selectCompanyAlerts));
    const operativeAlerts = Object.values(useSelector(selectOperativeAlerts));
    const drawingExpiry = Object.values(useSelector(selectDrawingExpiryMessages));

    const systemMessagesCount = useSelector(selectSystemMessagesCount);
    const companyAlertsCount = useSelector(selectCompanyAlertsCount);
    const drawingExpiryMessagesCount = useSelector(selectDrawingExpiryMessagesCount);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        switch (selectedTab) {
            case SYSTEM_MESSAGES:
                if (!isFetchingSystemMessages) dispatch(fetchSystemMessages());
                return;
            case COMPANY_ALERTS:
                if (!isFetchingCompanyAlerts) dispatch(fetchCompanyAlerts());
                return;
            case OPERATIVE_ALERTS:
                if (!isFetchingOperativeAlerts) dispatch(fetchOperativeAlerts());
                return;
            case DRAWING_EXPIRY:
                if (!isFetchingDrawingExpiryMessages) dispatch(fetchDrawingExpiryMessages());
                return;
            default:
                return;
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
            return messageLookup[selectedTab]
                .filter(message => {
                    for (let key in message) {
                        if (
                            typeof message[key] === 'string' &&
                            message[key].toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                            return true;
                        }
                    }
                    return false;
                })
                .sort((a, b) => sortByDate(a.createdOn, b.createdOn));
        } else {
            return [...messageLookup[selectedTab]].sort((a, b) =>
                sortByDate(a.createdOn, b.createdOn),
            );
        }
    }, [searchTerm, selectedTab, messageLookup]);

    const shouldShowSearch = !!searchTerm || !!messages.length;

    const markMessagesAsRead = () => {
        switch (selectedTab) {
            case SYSTEM_MESSAGES:
                if (systemMessagesCount) dispatch(markSystemMessagesAsRead());
                return;
            case COMPANY_ALERTS:
                if (companyAlertsCount) dispatch(markCompanyAlertsAsRead());
                return;
            case DRAWING_EXPIRY:
                if (drawingExpiryMessagesCount) dispatch(markDrawingExpiryMessagesAsRead());
                return;
            default:
                return;
        }
    };

    useEffect(() => {
        if (!hasFetched) return;
        markMessagesAsRead();
    }, [hasFetched]);

    useEffect(() => {
        if (!isFetching && prevProps.isFetching) setHasFetched(true);
        if (isFetching && !prevProps.isFetching) setHasFetched(false);
    }, [isFetching, prevProps.isFetching]);

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
