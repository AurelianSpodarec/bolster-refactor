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
import moment from 'moment';

const useCompanyTimesheetsTable = () => {
    const dispatch = useDispatch();

    const isFetching = useSelector(selectSuperAdminTimesheetsIsFetching);
    const error = useSelector(selectSuperAdminTimesheetsError);

    const page = useSelector(selectSuperAdminTimesheetsPage);
    const totalPages = useSelector(selectSuperAdminTimesheetsTotalPage);
    const pageSize = useSelector(selectSuperAdminTimesheetsPageSize);

    const startDateOfCurrentWeek = moment(new Date()).startOf('isoWeek').format('YYYY-MM-DD');

    const [order, setOrder] = useState('desc');
    const [curPage, setCurPage] = useState(page);
    const [startDate, setStartDate] = useState(startDateOfCurrentWeek);

    const timesheets = Object.values(useSelector(selectSuperAdminTimesheets)).sort((a, b) =>
        order === 'desc'
            ? b.numberOfHoursClockedIn - a.numberOfHoursClockedIn
            : a.numberOfHoursClockedIn - b.numberOfHoursClockedIn,
    );

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
        const queryParams = {
            page: curPage,
            pageSize,
            order,
            startDate,
        };
        dispatch(fetchSuperAdminTimesheets(queryParams));
    }, [order, curPage, pageSize, dispatch, startDate]);

    const setPage = nextPage => {
        setCurPage(nextPage);
    };

    const onPrev = () => {
        const newStartDate = moment(startDate).subtract(1, 'week').format('YYYY-MM-DD');
        setStartDate(newStartDate);
    };

    const onNext = () => {
        const newStartDate = moment(startDate).add(1, 'week').format('YYYY-MM-DD');
        setStartDate(newStartDate);
    };

    const onToday = () => {
        setStartDate(startDateOfCurrentWeek);
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
        startDate,
        onPrev,
        onNext,
        onToday,
    };
};

export default useCompanyTimesheetsTable;
