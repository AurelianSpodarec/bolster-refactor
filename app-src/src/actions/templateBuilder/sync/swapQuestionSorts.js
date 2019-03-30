import { SWAP_QUESTION_SORTS } from 'constants/actionTypes/templateBuilder';

export default (question1Uuid, question2Uuid) => dispatch =>
    dispatch({
        type: SWAP_QUESTION_SORTS,
        question1Uuid,
        question2Uuid
    });
