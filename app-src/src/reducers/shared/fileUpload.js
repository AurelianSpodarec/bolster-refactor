import { combineReducers } from 'redux';

import {
    FILE_UPLOAD_START,
    FILE_UPLOAD_FINISH
} from 'constants/actionTypes/fileUpload';

export default combineReducers({
    filesUploading: filesUploadingReducer,
    filesUploaded: filesUploadedReducer
});

function filesUploadingReducer(state = 0, action) {
    switch (action.type) {
        case FILE_UPLOAD_START:
            return ++state;
        case FILE_UPLOAD_FINISH:
            return action.close ? 0 : --state;
        default:
            return state;
    }
}

function filesUploadedReducer(state = false, action) {
    switch (action.type) {
        case FILE_UPLOAD_START:
            return false;
        case FILE_UPLOAD_FINISH:
            return true;
        default:
            return state;
    }
}
