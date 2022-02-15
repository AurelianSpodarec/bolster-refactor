import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ACTIVITY_LOG_REFERENCE_TYPES } from 'constants/companyAdmin/enums';

import fetchActivityLog from 'actions/superAdmin/activityLog/async/fetchActivityLog';
import {
    selectActivityLogArr,
    selectActivityLogIsFetching,
    selectActivityLogError,
    selectActivityLogPageNumber,
    selectActivityLogPageSize,
} from 'selectors/superAdmin/activityLog';

const useFetchActivityLog = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState(ACTIVITY_LOG_REFERENCE_TYPES.ALL);

    const logs = useSelector(selectActivityLogArr);
    const isFetching = useSelector(selectActivityLogIsFetching);
    const error = useSelector(selectActivityLogError);

    const page = useSelector(selectActivityLogPageNumber);
    const pageSize = useSelector(selectActivityLogPageSize);

    useEffect(() => {
        dispatch(fetchActivityLog(type, page, pageSize));
    }, [type, page, pageSize]);

    return { logs, isFetching, error, type, setType };
};

export default useFetchActivityLog;
