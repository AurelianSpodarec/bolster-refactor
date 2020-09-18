import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v1';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';
import withSetQuestion from '../hocs/withSetQuestion';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
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
    useManufacturingPrereqOptions,
    setUseManufacturingPrerqOptions,
    shouldShowUseManufacturingPrereqOptsSwitch,
}) => {
    const showStatusPrefillOptions =
        +questionTypeOptions[questionType].value === QUESTION_TYPE_NUMBERS.CHECKBOX ||
        +questionTypeOptions[questionType].value === QUESTION_TYPE_NUMBERS.NUMBER ||
        +questionTypeOptions[questionType].value === QUESTION_TYPE_NUMBERS.MULTI_LINE ||
        +questionTypeOptions[questionType].value === QUESTION_TYPE_NUMBERS.SINGLE_LINE ||
        +questionTypeOptions[questionType].value === QUESTION_TYPE_NUMBERS.RADIO
            ? true
            : false;

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
            showStatusPrefillOptions={showStatusPrefillOptions}
            handlePrereqOptionsChange={handlePrereqOptionsChange}
            useManufacturingPrereqOptions={useManufacturingPrereqOptions}
            setUseManufacturingPrerqOptions={setUseManufacturingPrerqOptions}
            shouldShowUseManufacturingPrereqOptsSwitch={shouldShowUseManufacturingPrereqOptsSwitch}
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
