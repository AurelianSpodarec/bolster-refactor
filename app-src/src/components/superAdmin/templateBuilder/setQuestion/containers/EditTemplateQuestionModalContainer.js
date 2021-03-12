import React, { useEffect } from 'react';

import withSetQuestion from '../hocs/withSetQuestion';
import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';
import { isEmpty } from 'helpers/generic';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
const { CHECKBOX } = QUESTION_TYPE_NUMBERS;

const EditTemplateQuestionModalContainerFN = ({
    fields: { questionType, questionTypeOptions, prereqUUIDs, ...fields },
    hideModal,
    handleInputChange,
    setQuestion,
    getQuestionData,
    statusOptions,
    handlePrefillStatusChange,
    handlePrefillStatusValueChange,
    handlePrereqOptionsChange,
    prereqOptions,
    prereqValueOptions,
    showPrefillOptions,
    question,
    updateQuestionFields,
    dropdownOptions,
}) => {
    useEffect(handleMount, []);

    return (
        <TemplateQuestionFormModal
            action="Edit"
            {...fields}
            statusOptions={statusOptions}
            prereqOptions={_getPrereqOptions()}
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
            dropdownOptions={dropdownOptions}
        />
    );

    function _getPrereqOptions() {
        const options = prereqOptions.filter(opt => opt.value !== question.uuid);
        return options;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newQuestion = {
            ...question,
            ...getQuestionData(),
        };
        setQuestion(newQuestion);
    }

    function handleMount() {
        const { statusPrefills, prereqVal, isRequiredVal } = question;
        const formData = {
            ...question,
            prereqVal: typeof prereqVal === 'string' ? prereqVal.split(',') : [],
        };

        if (isRequiredVal) {
            formData.isRequiredVal = +isRequiredVal;
        }
        if (statusPrefills) {
            formData.prefillStatuses = Object.keys(statusPrefills).map(status => +status);
        }
        if (questionType === CHECKBOX && !isEmpty(statusPrefills)) {
            formData.statusPrefills = Object.keys(statusPrefills).reduce((acc, key) => ({
                ...acc,
                [key]: statusPrefills[key] === 'true',
            }));
        }

        updateQuestionFields(formData);
    }
};

export default withSetQuestion(EditTemplateQuestionModalContainerFN);
