import React, { useEffect } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';

import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import fetchCompanyAlerts from 'actions/companyAdmin/messageCentre/async/fetchCompanyAlerts';
import fetchSystemMessages from 'actions/companyAdmin/messageCentre/async/fetchSystemMessages';
import fetchOperativeAlerts from 'actions/companyAdmin/messageCentre/async/fetchOperativeAlerts';
import fetchDrawingExpiryMessages from 'actions/companyAdmin/messageCentre/async/fetchDrawingExpiryMessages';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import MessageCentreTable from './MessageCentreTable';
import {
    selectMessageCentreIsFetchingCompanyAlerts,
    selectMessageCentreIsFetchingDrawingExpiryMessages,
    selectMessageCentreIsFetchingOperativeAlerts,
    selectMessageCentreIsFetchingSystemMessages,
} from 'selectors/companyAdmin/messageCentre';

const MessageCentre = () => {
    const dispatch = useDispatch();
    const isFetchingSystemMessages = useSelector(selectMessageCentreIsFetchingSystemMessages);
    const isFetchingCompanyAlerts = useSelector(selectMessageCentreIsFetchingCompanyAlerts);
    const isFetchingOperativeAlerts = useSelector(selectMessageCentreIsFetchingOperativeAlerts);
    const isFetchingDrawingExpiryMessages = useSelector(
        selectMessageCentreIsFetchingDrawingExpiryMessages,
    );

    useEffect(() => {
        batch(() => {
            dispatch(fetchAllSubscriptions());
            if (!isFetchingSystemMessages) dispatch(fetchSystemMessages());
            if (!isFetchingCompanyAlerts) dispatch(fetchCompanyAlerts());
            if (!isFetchingOperativeAlerts) dispatch(fetchOperativeAlerts());
            if (!isFetchingDrawingExpiryMessages) dispatch(fetchDrawingExpiryMessages());
        });
    }, []);

    return (
        <>
            <PageHeading title="Message Centre" withBackButton />
            <MessageCentreTable />
        </>
    );
};

export default MessageCentre;
