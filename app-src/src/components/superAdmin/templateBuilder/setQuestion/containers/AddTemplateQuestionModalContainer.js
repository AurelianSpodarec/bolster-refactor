import React from 'react';
import uuid from 'uuid/v1';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';
import withSetQuestion from '../hocs/withSetQuestion';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
import { convertArrToObj } from 'helpers/generic';

const AddTemplateQuestionModalContainer = ({
    fields: { questionType, questionTypeOptions, prereqUUID, ...fields },
    hideModal,
    handleInputChange,
    prereqOptions,
    setQuestion,
    sectionUUID,
    templateUUID,
    getQuestionData,
    questions,
    statusOptions,
    handlePrefillStatusChange,
    handlePrefillStatusValueChange,
}) => {
    const questionOptions = Object.values(questionTypeOptions).filter(
        ({ value }) =>
            +value !== QUESTION_TYPE_NUMBERS.STATUS &&
            +value !== QUESTION_TYPE_NUMBERS.STATIC_IMAGE,
    );

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
            {...fields}
            statusOptions={formatArrForDropdown(statusOptions)}
            prereqOptions={Object.values(prereqOptions)}
            selectedPrereq={prereqOptions[prereqUUID]}
            questionType={questionTypeOptions[questionType]}
            questionTypeOptions={questionOptions}
            hideModal={hideModal}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handlePrefillStatusChange={handlePrefillStatusChange}
            handlePrefillStatusValueChange={handlePrefillStatusValueChange}
            action="Add"
            showStatusPrefillOptions={showStatusPrefillOptions}
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
