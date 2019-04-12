import { QUESTION_TYPE_VALUES as VALS } from 'constants/shared/templateBuilder';

function formatQuestion({ questionType, dynamicFields, ...otherFields }) {
    return {
        questionType: questionType + '',
        ...otherFields,
        ...dynamicFields
    };
}

export function formatQuestions(questions) {
    return questions.map(ques => formatQuestion(ques));
}

function setDynamicFieldsSingle({
    charLimit,
    maxNum,
    options,
    canCompanyEdit,
    maxPhotos,
    ...otherFields
}) {
    let dynamicFields = {};
    switch (otherFields.questionType) {
        case VALS.SINGLE_LINE:
        case VALS.MULTI_LINE:
            dynamicFields = { charLimit };
            break;
        case VALS.NUMBER:
            dynamicFields = { maxNum };
            break;
        case VALS.DROPDOWN:
        case VALS.MULTI_DROPDOWN:
        case VALS.RADIO:
            dynamicFields = { options, canCompanyEdit };
            break;
        case VALS.MULTI_PHOTO:
            dynamicFields = { maxPhotos };
            break;
        default:
            dynamicFields = {};
    }

    return { ...otherFields, dynamicFields };
}

export function setDynamicFields(questions) {
    return questions.map(ques => setDynamicFieldsSingle(ques));
}
