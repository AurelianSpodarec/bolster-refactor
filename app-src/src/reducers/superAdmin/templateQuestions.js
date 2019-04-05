import { combineReducers } from 'redux';

import {
    updateObj,
    removeObjItem,
    swapItemSorts,
    convertArrToObj
} from 'helpers/generic';
import {
    SET_QUESTION,
    DELETE_QUESTION,
    CHANGE_QUESTION_SECTION,
    SWAP_QUESTION_SORTS,
    DELETE_SECTION
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    questions: questionsReducer
});

function questionsReducer(state = {}, action) {
    switch (action.type) {
        case SET_QUESTION:
            return updateObj(state, action.question.uuid, action.question);
        case CHANGE_QUESTION_SECTION:
            return {
                ...state,
                [action.questionUuid]: {
                    ...state[action.questionUuid],
                    sectionUuid: action.sectionUuid,
                    sort: action.sort
                }
            };
        case SWAP_QUESTION_SORTS:
            return swapItemSorts(
                state,
                action.question1Uuid,
                action.question2Uuid
            );
        case DELETE_QUESTION:
            return removeObjItem(state, action.uuid);
        case DELETE_SECTION: {
            const questionsArr = Object.values(state).filter(
                ({ sectionUuid }) => sectionUuid !== action.uuid
            );

            return convertArrToObj(questionsArr, 'uuid');
        }
        default:
            return state;
    }
}
