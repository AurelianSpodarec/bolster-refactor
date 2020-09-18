import React from 'react';
import uuid from 'uuid/v1';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';
import withSetQuestion from '../hocs/withSetQuestion';
import { convertArrToObj } from 'helpers/generic';

const AddTemplateQuestionModalContainer = ({
    fields: { questionType, questionTypeOptions, prereqUUID, ...fields },
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
            statusOptions={formatArrForDropdown(statusOptions)}
            prereqOptions={prereqOptions}
            selectedPrereq={prereqUUID}
            prereqValueOptions={prereqValueOptions}
            questionType={questionTypeOptions[questionType]}
            questionTypeOptions={Object.values(questionTypeOptions)}
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

    function formatArrForDropdown(arr, asObj) {
        const options = arr.map(({ value, label }) => ({
            value,
            label,
            text: label,
        }));

        return asObj ? convertArrToObj(options, 'value') : options;
    }
};

export default withSetQuestion(AddTemplateQuestionModalContainer);
