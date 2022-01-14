import React, { useEffect } from 'react';
import { useDispatch, batch } from 'react-redux';

import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import fetchCompanyAlerts from 'actions/companyAdmin/messageCentre/async/fetchCompanyAlerts';
import fetchSystemMessages from 'actions/companyAdmin/messageCentre/async/fetchSystemMessages';
import fetchOperativeAlerts from 'actions/companyAdmin/messageCentre/async/fetchOperativeAlerts';
import fetchDrawingExpiryMessages from 'actions/companyAdmin/messageCentre/async/fetchDrawingExpiryMessages';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import MessageCentreTable from './MessageCentreTable';

const MessageCentre = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        batch(() => {
            dispatch(fetchAllSubscriptions());
            dispatch(fetchSystemMessages());
            dispatch(fetchCompanyAlerts());
            dispatch(fetchOperativeAlerts());
            dispatch(fetchDrawingExpiryMessages());
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
