import axios from 'axios';

import {
    FETCH_DRAWING_INSPECTION_LOGS_REQUEST,
    FETCH_DRAWING_INSPECTION_LOGS_SUCCESS,
    FETCH_DRAWING_INSPECTION_LOGS_FAILURE
} from 'constants/actionTypes/drawings';

export const fetchDrawingInspectionLogsRequest = () => ({
    type: FETCH_DRAWING_INSPECTION_LOGS_REQUEST
});

export const fetchDrawingInspectionLogsSuccess = () => ({
    type: FETCH_DRAWING_INSPECTION_LOGS_SUCCESS
});

export const fetchDrawingInspectionLogsFailure = payload => ({
    type: FETCH_DRAWING_INSPECTION_LOGS_FAILURE,
    payload
});

export default () => dispatch => {
    dispatch(fetchDrawingInspectionLogsRequest());

    axios
        .get('/mockData/drawings/inspectionLogs.json')
        .then(res => dispatch(fetchDrawingInspectionLogsSuccess(res.data)))
        .catch(err => dispatch(fetchDrawingInspectionLogsFailure(err)));
};
