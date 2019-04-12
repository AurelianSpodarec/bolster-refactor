import { QUESTION_TYPES } from 'constants/shared/templateBuilder';

function formatQuestion({ type, dynamicFields, ...otherFields }) {
    return {
        questionType: QUESTION_TYPES[type],
        ...otherFields,
        ...dynamicFields
    };
}

export function formatQuestions(questions) {
    return questions.map(ques => formatQuestion(ques));
}

export const getLatestVersion = (id, versions) =>
    [...versions]
        .filter(({ templateID }) => +templateID === +id)
        .sort((a, b) => a.id - b.id)[0];

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
