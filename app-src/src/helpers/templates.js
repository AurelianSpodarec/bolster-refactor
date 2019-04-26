import { QUESTION_TYPES } from 'constants/shared/templateBuilder';
import { QUESTION_TYPE_VALUES as VALS } from 'constants/shared/templateBuilder';

const formatQuestion = ({ type, dynamicFields, ...otherFields }) => {
    const question = {
        questionType: QUESTION_TYPES[type + ''],
        type,
        ...otherFields,
        ...dynamicFields
    };

    if (dynamicFields.options)
        question.options = dynamicFields.options.map(opt => ({
            id: opt,
            text: opt
        }));

    return question;
};

export const formatQuestions = questions =>
    questions.map(ques => formatQuestion(ques));

export const getLatestVersion = (id, versions) =>
    [...versions]
        .filter(({ templateID }) => +templateID === +id)
        .sort((a, b) => b.id - a.id)[0];

export const getVersionSections = (version, sections) =>
    sections
        .filter(({ templateVersionID }) => templateVersionID === version.id)
        .sort((a, b) => a.sort - b.sort);

export const getSectionQuestions = (sections, questions) =>
    sections.reduce(
        (acc, { id }) => ({
            ...acc,
            [id]: questions
                .filter(({ templateSectionID }) => templateSectionID === id)
                .sort((a, b) => a.sort - b.sort)
        }),
        {}
    );

export const getQuestionDetails = question => {
    const {
        name,
        questionType,
        isHidden,
        isPrefill,
        isRequired,
        groupKey,
        type
    } = question;
    const options = {
        Name: name,
        'Question type': questionType,
        Hidden: `${!isHidden ? 'Not ' : ''}Hidden`,
        Prefill: `${!isPrefill ? 'Not ' : ''}Prefilled`,
        Required: `${!isRequired ? 'Not ' : ''}Required`,
        'Group Key': groupKey
    };
    switch (String(type)) {
        case VALS.SINGLE_LINE:
        case VALS.MULTI_LINE:
            return {
                ...options,
                'Character limit': question.charLimit || 'N/A'
            };
        case VALS.NUMBER:
            return { ...options, 'Max number': question.maxNum || 'N/A' };
        case VALS.DROPDOWN:
        case VALS.MULTI_DROPDOWN:
        case VALS.RADIO:
            return {
                ...options,
                'Question options': question.options
                    .map(({ text }) => `"${text}"`)
                    .join(', ')
            };

        case VALS.MULTI_PHOTO:
            return { ...options, 'Max photos': question.maxPhotos || 'N/A' };
        default:
            return options;
        // empty obj
    }
};

function setDynamicFieldsSingle({
    charLimit,
    maxNum,
    options,
    canCompanyEdit,
    maxPhotos,
    ...otherFields
}) {
    let dynamicFields = {};
    switch (otherFields.questionType + '') {
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
            dynamicFields = {
                options: [
                    ...new Set(Object.values(options).map(opt => opt.text))
                ],
                canCompanyEdit
            };
            break;
        case VALS.MULTI_PHOTO:
            dynamicFields = { maxPhotos };
            break;
        default:
            dynamicFields = {};
    }

    return { ...otherFields, dynamicFields };
}

export const setDynamicFields = questions =>
    questions.map(ques => setDynamicFieldsSingle(ques));
