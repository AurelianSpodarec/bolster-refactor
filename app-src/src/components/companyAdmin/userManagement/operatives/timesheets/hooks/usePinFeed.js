import fetchUserPinFeed from 'actions/companyAdmin/pins/async/fetchUserPinFeed';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectUserPinFeed,
    selectUserPinFeedFetchError,
    selectUserPinFeedIsFetching,
} from 'selectors/companyAdmin/userPinFeed';

const usePinFeed = (userID, date, isWeek) => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectUserPinFeedIsFetching);
    const fetchError = useSelector(selectUserPinFeedFetchError);
    const feed = useSelector(selectUserPinFeed);

    useEffect(() => {
        dispatch(fetchUserPinFeed(userID, date, isWeek));
    }, [dispatch, userID, date, isWeek]);

    return { isFetching, fetchError, feed };
};

export default usePinFeed;
