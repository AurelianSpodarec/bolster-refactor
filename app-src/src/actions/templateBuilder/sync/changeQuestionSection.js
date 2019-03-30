import { CHANGE_QUESTION_SECTION } from 'constants/actionTypes/templateBuilder';

export default (questionUuid, sectionUuid, sort) => dispatch =>
    dispatch({
        type: CHANGE_QUESTION_SECTION,
        questionUuid,
        sectionUuid,
        sort
    });
