import React from 'react';

import AddPinQuestionRoute from '../containers/AddPinQuestionRoute';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const AddPinQuestions = ({
    sections,
    questions,
    selectedVersion,
    isHistory,
    sectionIDs,
    isSameTemplate,
    pinAnswersByGroupKey,
    dropdownOptionsByType,
    oldAnswersByNameObj,
    template,
    latestPinHistory,
    pinOptions,
    drawingID,
}) => {
    const answersCacheKey = `answersCache#${selectedVersion.id}`;
    return [...sections]
        .sort((a, b) => a.sort - b.sort)
        .map(section => (
            <div key={section.value} className="size-lg-12">
                <BlockHeading classes="sub-heading" title={section.text} />
                <div className="flex-row flex-wrap width-12">
                    {[...questions]
                        .filter(question => question.templateSectionID === section.value)
                        .sort((a, b) => a.sort - b.sort)
                        .map(question => (
                            <AddPinQuestionRoute
                                isHistory={isHistory}
                                selectedVersion={selectedVersion}
                                key={question.id}
                                question={question}
                                sectionIDs={sectionIDs}
                                isSameTemplate={isSameTemplate}
                                pinAnswersByGroupKey={pinAnswersByGroupKey}
                                dropdownOptionsByType={dropdownOptionsByType}
                                oldAnswersByNameObj={oldAnswersByNameObj}
                                template={template}
                                latestPinHistory={latestPinHistory}
                                cachedAnswers={
                                    JSON.parse(localStorage.getItem(answersCacheKey)) || null
                                }
                                pinOptions={pinOptions}
                                drawingID={drawingID}
                            />
                        ))}
                </div>
            </div>
        ));
};

export default React.memo(AddPinQuestions);
