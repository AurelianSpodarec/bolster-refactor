import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ACTIVITY_LOG_REFERENCE_TYPES } from 'constants/companyAdmin/enums';
import { usePrevious } from 'helpers/hooks';

import fetchActivityLog from 'actions/superAdmin/activityLog/async/fetchActivityLog';
import {
    selectActivityLogArr,
    selectActivityLogIsFetching,
    selectActivityLogError,
    selectActivityLogTotalPages,
} from 'selectors/superAdmin/activityLog';

const useFetchActivityLog = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState(ACTIVITY_LOG_REFERENCE_TYPES.ALL_TYPES);

    const [curPage, setCurPage] = useState(1);

    const logs = useSelector(selectActivityLogArr);
    const isFetching = useSelector(selectActivityLogIsFetching);
    const error = useSelector(selectActivityLogError);

    const totalPages = useSelector(selectActivityLogTotalPages);

    const prevProps = usePrevious({ type });

    useEffect(() => {
        if (type !== prevProps.type) {
            dispatch(fetchActivityLog(type, 1));
            setCurPage(1);
        } else {
            dispatch(fetchActivityLog(type, curPage));
        }
    }, [dispatch, type, prevProps.type, curPage]);

    return { logs, isFetching, error, type, setType, curPage, setCurPage, totalPages };
};

export default useFetchActivityLog;
