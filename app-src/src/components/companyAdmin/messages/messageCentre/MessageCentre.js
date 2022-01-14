import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import MessageCentreTable from './MessageCentreTable';

const MessageCentre = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllSubscriptions());
    }, []);

    return (
        <>
            <PageHeading title="Message Centre" withBackButton />
            <MessageCentreTable />
        </>
    );
};

export default MessageCentre;
