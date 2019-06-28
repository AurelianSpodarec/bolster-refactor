import React from 'react';

import PreviewQuestionRoute from '../containers/PreviewQuestionRoute';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PreviewSection = ({ section, questions }) => (
    <div className="size-lg-12">
        <BlockHeading title={section.name} />
        <div className="generic-form">
            {questions.map(question => (
                <PreviewQuestionRoute key={question.uuid} question={question} />
            ))}
        </div>
    </div>
);

export default PreviewSection;
