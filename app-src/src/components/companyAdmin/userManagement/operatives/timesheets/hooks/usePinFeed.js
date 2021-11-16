import fetchUserPinFeeds from 'actions/companyAdmin/pins/async/fetchUserPinFeeds';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectUserPinFeeds,
    selectUserPinFeedsIsFetching,
    selectUserPinFeedsFetchError,
} from 'selectors/companyAdmin/userPinFeeds';

const usePinFeed = (userIDs, date, isWeek) => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectUserPinFeedsIsFetching);
    const fetchError = useSelector(selectUserPinFeedsFetchError);
    const feed = useSelector(selectUserPinFeeds);

    useEffect(() => {
        if (userIDs) dispatch(fetchUserPinFeeds(userIDs, date, isWeek));
    }, [dispatch, userIDs, date, isWeek]);

    return { isFetching, fetchError, feed };
};

export default usePinFeed;
