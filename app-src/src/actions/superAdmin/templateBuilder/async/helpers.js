function formatQuestion({ dynamicFields, ...otherFields }) {
    return {
        ...otherFields,
        ...dynamicFields
    };
}

export function formatQuestions(questions) {
    return questions.map(ques => formatQuestion(ques));
}
