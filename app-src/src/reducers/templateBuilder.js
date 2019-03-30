import { combineReducers } from 'redux';

import { updateObj, removeObjItem } from 'helpers/generic';
import {
    ADD_SECTION,
    DELETE_SECTION,
    UPDATE_SECTION,
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION
} from 'constants/actionTypes/templateBuilder';

const defaultSections = {
    '9d707ec0-52e3-11e9-8633-45ed325a6f1e': {
        name: 'Section 1',
        sort: 1,
        uuid: '9d707ec0-52e3-11e9-8633-45ed325a6f1e'
    },
    '9d707ec0-52e3-11e9-8633-45ed325a6f2f': {
        name: 'Section 2',
        sort: 2,
        uuid: '9d707ec0-52e3-11e9-8633-45ed325a6f2f'
    }
};

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
    sections: sectionsReducer,
    questions: questionsReducer
});

function sectionsReducer(state = defaultSections, action) {
    switch (action.type) {
        case ADD_SECTION:
        case UPDATE_SECTION:
            return updateObj(state, action.section.uuid, action.section);
        case DELETE_SECTION:
            return removeObjItem(state, action.uuid);
        default:
            return state;
    }
}

function questionsReducer(state = defaultQuestions, action) {
    switch (action.type) {
        case ADD_QUESTION:
        case EDIT_QUESTION:
            return updateObj(state, action.question.uuid, action.question);
        case DELETE_QUESTION:
            return removeObjItem(state, action.uuid);
        default:
            return state;
    }
}
