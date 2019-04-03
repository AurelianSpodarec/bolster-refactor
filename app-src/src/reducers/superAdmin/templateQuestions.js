import { combineReducers } from 'redux';

import { updateObj, removeObjItem, swapItemSorts } from 'helpers/generic';
import {
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    CHANGE_QUESTION_SECTION,
    SWAP_QUESTION_SORTS
} from 'constants/actionTypes/templateBuilder';

// dummy data
const defaultQuestions = {
    'aa22ec20-52e3-11e9-8633-45ed325a6f1e': {
        isHidden: true,
        isPrefill: true,
        isRequired: true,
        name: 'Question 1',
        prereqUuid: '',
        prereqVal: '',
        questionType: 'DROPDOWN',
        sectionUuid: '9d707ec0-52e3-11e9-8633-45ed325a6f1e',
        sort: 1,
        uuid: 'aa22ec20-52e3-11e9-8633-45ed325a6f1e'
    },
    '273ab210-52e4-11e9-ac26-8590a0785f92': {
        isHidden: true,
        isPrefill: false,
        isRequired: true,
        name: 'Question 2',
        prereqUuid: 'aa22ec20-52e3-11e9-8633-45ed325a6f1e',
        prereqVal: 'prereq val',
        questionType: 'SINGLE_LINE',
        sectionUuid: '9d707ec0-52e3-11e9-8633-45ed325a6f1e',
        sort: 2,
        uuid: '273ab210-52e4-11e9-ac26-8590a0785f92'
    },
    '273ab210-52e4-11e9-ac26-8590a0785f23': {
        isHidden: true,
        isPrefill: false,
        isRequired: false,
        name: 'Question 3',
        prereqUuid: '',
        prereqVal: '',
        questionType: 'SINGLE_LINE',
        sectionUuid: '9d707ec0-52e3-11e9-8633-45ed325a6f1e',
        sort: 3,
        uuid: '273ab210-52e4-11e9-ac26-8590a0785f23'
    },
    '273ab210-52e4-11e9-ac26-8590a0785f34': {
        isHidden: true,
        isPrefill: false,
        isRequired: false,
        name: 'Question 4',
        prereqUuid: '',
        prereqVal: '',
        questionType: 'SINGLE_LINE',
        sectionUuid: '9d707ec0-52e3-11e9-8633-45ed325a6f2f',
        sort: 1,
        uuid: '273ab210-52e4-11e9-ac26-8590a0785f34'
    }
};

export default combineReducers({
    questions: questionsReducer
});

function questionsReducer(state = defaultQuestions, action) {
    switch (action.type) {
        case ADD_QUESTION:
        case EDIT_QUESTION:
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
        default:
            return state;
    }
}
