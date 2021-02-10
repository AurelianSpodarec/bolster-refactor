import { combineReducers } from 'redux';
import uuid from 'uuid/v1';

import {
    QUESTION_TYPE_VALUES,
    QUESTION_TYPES,
    QUESTION_TYPE_NUMBERS,
} from 'constants/shared/templateBuilder';
import {
    UPDATE_QUESTION_FIELD,
    UPDATE_QUESTION_FIELDS,
    RESET_QUESTION_FIELDS,
} from 'constants/actionTypes/templateBuilder';

const { STATUS, STATIC_IMAGE } = QUESTION_TYPE_VALUES;

const questionTypeOptions = Object.keys(QUESTION_TYPES)
    .filter(({ value }) => value !== STATUS && value !== STATIC_IMAGE)
    .map(type => ({
        label: QUESTION_TYPES[type],
        value: +type,
    }));

const initialQuestionFields = {
    questionTypeOptions,
    questionType: QUESTION_TYPE_NUMBERS.SINGLE_LINE,
    prereqOptions: {},
    prereqUUIDs: [],
    prereqVal: [],
    name: '',
    isRequired: false,
    isHidden: false,
    isPrefill: false,
    charLimit: '300',
    maxNum: '',
    options: [{ text: '', id: uuid() }],
    maxPhotos: '',
    canCompanyEdit: false,
    optionType: '',
    statusOptions: [],
    isRequiredVal: null,
    prefillStatuses: [],
    statusPrefills: {},
};

export default combineReducers({
    fields: fieldsReducer,
});

function fieldsReducer(state = initialQuestionFields, action) {
    switch (action.type) {
        case UPDATE_QUESTION_FIELD:
            return {
                ...state,
                [action.name]: action.value,
            };
        case UPDATE_QUESTION_FIELDS:
            return {
                ...state,
                ...action.fields,
            };
        case RESET_QUESTION_FIELDS:
            return initialQuestionFields;
        default:
            return state;
    }
}
