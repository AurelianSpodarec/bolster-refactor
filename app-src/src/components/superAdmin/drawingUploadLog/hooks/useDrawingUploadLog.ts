import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fetchAllDrawingUploadLogs from 'actions/superAdmin/drawingUploadLog/fetchAllDrawingUploadLogs';
import {
    selectDrawingUploadLogCount,
    selectDrawingUploadLogPage,
    selectDrawingUploadLogs,
    selectDrawingUploadLogsError,
    selectDrawingUploadLogsIsFetching,
} from 'selectors/superAdmin/drawingUploadLogs';

const useDrawingUploadLog = () => {
    const dispatch = useDispatch();

    const pageSize = 50;
    const page = useSelector(selectDrawingUploadLogPage);
    const totalPages = Math.ceil(useSelector(selectDrawingUploadLogCount) / pageSize);

    useEffect(() => {
        dispatch(fetchAllDrawingUploadLogs(1, pageSize));
    }, [dispatch]);

    const isFetching: boolean = useSelector(selectDrawingUploadLogsIsFetching);
    const fetchError: string | null = useSelector(selectDrawingUploadLogsError);
    const drawingsLogs = Object.values(useSelector(selectDrawingUploadLogs));

    const setPage = (nextPage: number) => {
        dispatch(fetchAllDrawingUploadLogs(nextPage, pageSize));
    };

    return { isFetching, fetchError, drawingsLogs, page, setPage, totalPages };
};

export default useDrawingUploadLog;
