import fetchMessages from 'actions/companyAdmin/messages/async/fetchMessages';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AllMessages from '../presentational/AllMessages';

const AllMessagesContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMessages());
        dispatch(fetchAllSubscriptions());
    }, []);

    return <AllMessages />;
};

export default AllMessagesContainer;
