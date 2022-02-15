import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchActivityLog from 'actions/superAdmin/activityLog/async/fetchActivityLog';
import {
    selectActivityLogArr,
    selectActivityLogIsFetching,
    selectActivityLogError,
} from 'selectors/superAdmin/activityLog';

const useFetchActivityLog = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState(null);

    const logs = useSelector(selectActivityLogArr);
    const isFetching = useSelector(selectActivityLogIsFetching);
    const error = useSelector(selectActivityLogError);

    useEffect(() => {
        dispatch(fetchActivityLog(type));
    }, [type]);

    return { logs, isFetching, error, type, setType };
};

export default useFetchActivityLog;
