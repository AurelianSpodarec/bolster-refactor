import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchSuperAdminTimesheets from 'actions/superAdmin/timesheets/fetchSuperAdminTimesheets';

import {
    selectSuperAdminTimesheetsIsFetching,
    selectSuperAdminTimesheets,
    selectSuperAdminTimesheetsError,
    selectSuperAdminTimesheetsPage,
    selectSuperAdminTimesheetsTotalPage,
    selectSuperAdminTimesheetsPageSize,
} from 'selectors/superAdmin/timesheets';

const useCompanyTimesheetsTable = () => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectSuperAdminTimesheetsIsFetching);
    const timesheets = Object.values(useSelector(selectSuperAdminTimesheets));
    const error = useSelector(selectSuperAdminTimesheetsError);

    const page = useSelector(selectSuperAdminTimesheetsPage);
    const totalPages = useSelector(selectSuperAdminTimesheetsTotalPage);
    const pageSize = useSelector(selectSuperAdminTimesheetsPageSize);

    const [order, setOrder] = useState('desc');
    const [curPage, setCurPage] = useState(page);

    const sortOptions = [
        {
            label: 'Sort Descending',
            value: 'desc',
        },
        {
            label: 'Sort Ascending',
            value: 'asc',
        },
    ];

    useEffect(() => {
        dispatch(fetchSuperAdminTimesheets(curPage, pageSize, order));
    }, [order, curPage, pageSize, dispatch]);

    const setPage = nextPage => {
        setCurPage(nextPage);
    };

    return {
        isFetching,
        timesheets,
        error,
        page,
        totalPages,
        pageSize,
        setPage,
        order,
        setOrder,
        sortOptions,
    };
};

export default useCompanyTimesheetsTable;
