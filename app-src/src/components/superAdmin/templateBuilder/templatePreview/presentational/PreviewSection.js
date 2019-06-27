import React from 'react';

import PreviewQuestionRoute from '../containers/PreviewQuestionRoute';

const PreviewSection = ({ section, questions }) => (
    <div className="size-lg-12">
        <p>{section.name}</p>
        {questions.map(question => (
            <PreviewQuestionRoute key={question.uuid} question={question} />
        ))}
    </div>
);

export default PreviewSection;
