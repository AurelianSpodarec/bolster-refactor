import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fetchAllDrawingUploadLogs from 'actions/superAdmin/drawingUploadLog/fetchAllDrawingUploadLogs';
import {
    selectDrawingUploadLogs,
    selectDrawingUploadLogsError,
    selectDrawingUploadLogsIsFetching,
} from 'selectors/superAdmin/drawingUploadLogs';

const useDrawingUploadLog = (page: number, pageSize: number) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllDrawingUploadLogs(page, pageSize));
    }, [dispatch, page, pageSize]);

    const isFetching: boolean = useSelector(selectDrawingUploadLogsIsFetching);
    const fetchError: string | null = useSelector(selectDrawingUploadLogsError);
    const drawingsLogs = Object.values(useSelector(selectDrawingUploadLogs));

    return { isFetching, fetchError, drawingsLogs };
};

export default useDrawingUploadLog;
