import { SET_PIN_IMAGE_S3_KEY } from 'constants/actionTypes/templateBuilder';

export default s3Key => dispatch =>
    dispatch({
        type: SET_PIN_IMAGE_S3_KEY,
        s3Key,
    });
