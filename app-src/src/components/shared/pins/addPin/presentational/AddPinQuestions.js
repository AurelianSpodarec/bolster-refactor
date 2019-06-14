import React from 'react';

import AddPinQuestionRoute from '../containers/AddPinQuestionRoute';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AddPinQuestions = ({ sections, questions, selectedVersion, isHistory }) =>
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
                                isHistory={isHistory}
                                selectedVersion={selectedVersion}
                                key={question.id}
                                question={question}
                            />
                        ))}
                </div>
            </div>
        ));

export default AddPinQuestions;
