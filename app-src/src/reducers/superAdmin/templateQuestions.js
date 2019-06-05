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
    DELETE_SECTION,
    POST_TEMPLATE_SUCCESS,
    FETCH_TEMPLATE_SUCCESS
} from 'constants/actionTypes/templateBuilder';
import { formatQuestions } from 'helpers/templates';

export default combineReducers({
    questions: questionsReducer
});

function questionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TEMPLATE_SUCCESS:
            return {
                ...state,
                ...convertArrToObj(formatQuestions(action.questions), 'uuid')
            };
        case SET_QUESTION:
            return updateObj(state, action.question.uuid, action.question);
        case CHANGE_QUESTION_SECTION:
            return {
                ...state,
                [action.questionUUID]: {
                    ...state[action.questionUUID],
                    sectionUUID: action.sectionUUID,
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
                ({ sectionUUID }) => sectionUUID !== action.uuid
            );

            return convertArrToObj(questionsArr, 'uuid');
        }
        case POST_TEMPLATE_SUCCESS: {
            const filteredQuestions = Object.values(state).filter(
                ques => ques.templateUUID !== action.oldUUID
            );
            return {
                ...convertArrToObj(filteredQuestions, 'uuid'),
                ...convertArrToObj(action.questions, 'uuid')
            };
        }
        default:
            return state;
    }
}
