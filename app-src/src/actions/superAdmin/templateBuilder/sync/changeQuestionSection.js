import { CHANGE_QUESTION_SECTION } from 'constants/actionTypes/templateBuilder';

export default (questionUUID, sectionUUID, sort) => dispatch =>
    dispatch({
        type: CHANGE_QUESTION_SECTION,
        questionUUID,
        sectionUUID,
        sort
    });
