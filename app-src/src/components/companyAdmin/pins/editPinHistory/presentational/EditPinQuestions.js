import React from 'react';

import EditPinQuestionRoute from '../containers/EditPinQuestionRoute';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const EditPinQuestions = ({ sections, questions }) =>
    [...sections]
        .sort((a, b) => a.sort - b.sort)
        .map(section => (
            <div key={section.value} className="size-lg-12">
                <BlockHeading classes="sub-heading" title={section.text} />

                {[...questions]
                    .filter(
                        question => question.templateSectionID === section.value
                    )
                    .sort((a, b) => a.sort - b.sort)
                    .map(question => (
                        <EditPinQuestionRoute
                            key={question.id}
                            question={question}
                        />
                    ))}
            </div>
        ));

export default EditPinQuestions;
