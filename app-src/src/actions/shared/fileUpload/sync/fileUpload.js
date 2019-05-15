import {
    FILE_UPLOAD_START,
    FILE_UPLOAD_FINISH
} from 'constants/actionTypes/fileUpload';

export const fileUploadStart = () => ({
    type: FILE_UPLOAD_START
});

export const fileUploadFinish = close => ({
    type: FILE_UPLOAD_FINISH,
    close
});
