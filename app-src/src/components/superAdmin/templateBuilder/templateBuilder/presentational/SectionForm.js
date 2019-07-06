import React from 'react';

import AddPinQuestionRoute from '../containers/AddPinQuestionRoute';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SectionForm = ({ section, questions }) => (
    <div key={section.value} className="size-lg-12">
        <BlockHeading classes="sub-heading" title={section.text} />

        <div className="flex-row">
            {[...questions]
                .filter(
                    question => question.templateSectionID === section.value
                )
                .sort((a, b) => a.sort - b.sort)
                .map(question => (
                    <AddPinQuestionRoute
                        key={question.id}
                        question={question}
                    />
                ))}
        </div>
    </div>
);

export default SectionForm;
