import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    ACTIVITY_LOG_REFERENCE_TYPES,
    COMPANY_USER_ROLE_TYPES,
} from 'constants/companyAdmin/enums';
import { usePrevious } from 'helpers/hooks';

import fetchActivityLog from 'actions/companyAdmin/activityLog/async/fetchActivityLog';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import {
    selectActivityLogArr,
    selectActivityLogIsFetching,
    selectActivityLogError,
    selectActivityLogTotalPages,
} from 'selectors/companyAdmin/activityLog';
import {
    selectCompanyUsers,
    selectCompanyUsersFetchError,
    selectCompanyUsersIsFetching,
} from 'selectors/companyAdmin/companyUsers';
import { selectJWTData } from 'selectors/shared/decodeJWT';

const useFetchActivityLog = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState(ACTIVITY_LOG_REFERENCE_TYPES.ALL);

    const [curPage, setCurPage] = useState(1);

    const logs = useSelector(selectActivityLogArr);
    const isFetchingActivityLog = useSelector(selectActivityLogIsFetching);
    const activityLogError = useSelector(selectActivityLogError);

    const users = useSelector(selectCompanyUsers);
    const isFetchingCompanyUsers = useSelector(selectCompanyUsersIsFetching);
    const activityCompanyUsersError = useSelector(selectCompanyUsersFetchError);

    const { companyUserType } = useSelector(selectJWTData);

    const isFetching = isFetchingActivityLog || isFetchingCompanyUsers;
    const error = activityLogError || activityCompanyUsersError;

    const isOwner = companyUserType === COMPANY_USER_ROLE_TYPES.OWNER;

    const totalPages = useSelector(selectActivityLogTotalPages);

    const prevProps = usePrevious({ type, curPage });

    useEffect(() => {
        dispatch(fetchCompanyUsers());
    }, [dispatch]);

    useEffect(() => {
        if (type !== prevProps.type) {
            dispatch(fetchActivityLog(type, 1));
            setCurPage(1);
        } else {
            dispatch(fetchActivityLog(type, curPage));
        }
    }, [dispatch, type, prevProps.type, curPage]);

    return {
        logs,
        users,
        isFetching,
        error,
        isOwner,
        type,
        setType,
        curPage,
        setCurPage,
        totalPages,
    };
};

export default useFetchActivityLog;
