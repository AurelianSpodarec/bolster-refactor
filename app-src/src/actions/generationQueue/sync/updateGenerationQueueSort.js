import { UPDATE_GENERATION_QUEUE_SORT } from 'constants/actionTypes/generationQueue';

export default sortString => dispatch =>
    dispatch({
        type: UPDATE_GENERATION_QUEUE_SORT,
        sortString
    });
