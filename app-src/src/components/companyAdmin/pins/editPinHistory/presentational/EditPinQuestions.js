import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddPinQuestionRoute from 'components/shared/pins/addPin/containers/AddPinQuestionRoute';

const EditPinQuestions = ({ sections, questions, selectedVersion }) =>
    [...sections]
        .sort((a, b) => a.sort - b.sort)
        .map(section => (
            <div key={section.value} className="size-lg-12">
                <BlockHeading classes="sub-heading" title={section.text} />

                <div className="flex-row">
                    {[...questions]
                        .filter(
                            question =>
                                question.templateSectionID === section.value
                        )
                        .sort((a, b) => a.sort - b.sort)
                        .map(question => (
                            <AddPinQuestionRoute
                                key={question.id}
                                question={question}
                                selectedVersion={selectedVersion}
                                edit
                            />
                        ))}
                </div>
            </div>
        ));

export default EditPinQuestions;
