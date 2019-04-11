import { combineReducers } from 'redux';
import uuid from 'uuid/v1';

import {
    QUESTION_TYPE_VALUES,
    QUESTION_TYPES
} from 'constants/superAdmin/templateBuilder';
import {
    UPDATE_QUESTION_FIELD,
    UPDATE_QUESTION_FIELDS,
    RESET_QUESTION_FIELDS
} from 'constants/actionTypes/templateBuilder';
import { convertArrToObj } from 'helpers/generic';

const questionTypeOptions = Object.keys(QUESTION_TYPES).map(type => ({
    text: QUESTION_TYPES[type],
    value: type
}));
const fotmattedQuestionTypes = convertArrToObj(questionTypeOptions, 'value');
const initialQuestionFields = {
    questionTypeOptions: fotmattedQuestionTypes,
    questionType: QUESTION_TYPE_VALUES.SINGLE_LINE,
    prereqOptions: {},
    prereqUuid: '',
    prereqVal: '',
    name: '',
    isRequired: false,
    isHidden: false,
    isPrefill: false,
    charLimit: '300',
    maxNum: '',
    options: [{ text: '', id: uuid() }],
    maxPhotos: '',
    canCompanyEdit: ''
};

export default combineReducers({
    fields: fieldsReducer
});

function fieldsReducer(state = initialQuestionFields, action) {
    switch (action.type) {
        case UPDATE_QUESTION_FIELD:
            return {
                ...state,
                [action.name]: action.value
            };
        case UPDATE_QUESTION_FIELDS:
            return {
                ...state,
                ...action.fields
            };
        case RESET_QUESTION_FIELDS:
            return initialQuestionFields;
        default:
            return state;
    }
}
