import fetchUserPinFeed from 'actions/companyAdmin/pins/async/fetchUserPinFeed';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectUserPinFeed,
    selectUserPinFeedFetchError,
    selectUserPinFeedIsFetching,
} from 'selectors/companyAdmin/userPinFeed';

const usePinFeed = (userIDs, date, isWeek) => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectUserPinFeedIsFetching);
    const fetchError = useSelector(selectUserPinFeedFetchError);
    const feed = useSelector(selectUserPinFeed);

    useEffect(() => {
        if (userIDs) dispatch(fetchUserPinFeed(userIDs, date, isWeek));
    }, [dispatch, userIDs, date, isWeek]);

    return { isFetching, fetchError, feed };
};

export default usePinFeed;
