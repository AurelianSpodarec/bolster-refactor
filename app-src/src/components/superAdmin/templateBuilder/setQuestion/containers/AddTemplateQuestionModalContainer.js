import React from 'react';
import uuid from 'uuid/v1';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';
import withSetQuestion from '../hocs/withSetQuestion';

const AddTemplateQuestionModalContainer = ({
    fields: { questionType, questionTypeOptions, prereqUUIDs, ...fields },
    hideModal,
    handleInputChange,
    setQuestion,
    sectionUUID,
    templateUUID,
    getQuestionData,
    questions,
    statusOptions,
    handlePrefillStatusChange,
    handlePrefillStatusValueChange,
    handlePrereqOptionsChange,
    prereqOptions,
    prereqValueOptions,
    showPrefillOptions,
}) => {
    return (
        <TemplateQuestionFormModal
            action="Add"
            {...fields}
            statusOptions={statusOptions}
            prereqOptions={prereqOptions}
            selectedPrereq={prereqUUIDs}
            prereqValueOptions={prereqValueOptions}
            questionType={questionType}
            questionTypeOptions={questionTypeOptions}
            hideModal={hideModal}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handlePrefillStatusChange={handlePrefillStatusChange}
            handlePrefillStatusValueChange={handlePrefillStatusValueChange}
            showPrefillOptions={showPrefillOptions}
            handlePrereqOptionsChange={handlePrereqOptionsChange}
        />
    );

    function handleSubmit(e) {
        e.preventDefault();

        const newQuestion = {
            templateUUID,
            sectionUUID,
            uuid: uuid(),
            sort: _getSort(),
            ...getQuestionData(),
        };
        setQuestion(newQuestion);
    }

    function _getSort() {
        const sectionSortList = questions
            .filter(q => q.sectionUUID === sectionUUID)
            .map(q => q.sort);
        return Math.max(0, ...sectionSortList) + 1;
    }
};

export default withSetQuestion(AddTemplateQuestionModalContainer);
