import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';

import AddPinQuestionRoute from '../containers/AddPinQuestionRoute';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AddPinQuestions = ({ sections, questions }) =>
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
                        <AddPinQuestionRoute
                            key={question.id}
                            question={question}
                        />
                    ))}
            </div>
        ));

export default AddPinQuestions;
