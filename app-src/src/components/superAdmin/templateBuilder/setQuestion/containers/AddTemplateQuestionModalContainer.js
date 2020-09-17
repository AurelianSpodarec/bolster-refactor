import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v1';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';
import withSetQuestion from '../hocs/withSetQuestion';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
import { convertArrToObj } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

const AddTemplateQuestionModalContainer = ({
    fields: { questionType, questionTypeOptions, prereqUUID, ...fields },
    hideModal,
    handleInputChange,
    standardPrereqOptions,
    allPrereqOptions,
    setQuestion,
    sectionUUID,
    templateUUID,
    getQuestionData,
    questions,
    statusOptions,
    handlePrefillStatusChange,
    handlePrefillStatusValueChange,
    handlePrereqOptionsChange,
    updateQuestionField,
    prereqOptions,
    prereqValueOptions,
}) => {
    const [showManufacturingOptions, setShowManufacturingOptions] = useState(false);
    const [showManufacturingOptionsToggle, setShowManufacturingOptionsToggle] = useState(false);

    const prevPrereqUUID = usePrevious(prereqUUID);

    useEffect(() => {
        if (prevPrereqUUID !== prevPrereqUUID) {
            // if (
            //     getQuestionData().prereqUUID &&
            //     standardPrereqOptions[getQuestionData().prereqUUID] &&
            //     standardPrereqOptions[getQuestionData().prereqUUID].options.length <
            //         allPrereqOptions[getQuestionData().prereqUUID].options.length
            // ) {
            //     setShowManufacturingOptionsToggle(true);
            // } else {
            //     setShowManufacturingOptionsToggle(false);
            // }
        }
    }, [prereqUUID, prevPrereqUUID]);

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
            action="Add"
            showStatusPrefillOptions={showStatusPrefillOptions}
            handlePrereqOptionsChange={handlePrereqOptionsChange}
            showManufacturingOptions={showManufacturingOptions}
            handleShowManufacturerOptionsCheck={handleShowManufacturerOptionsCheck}
            showManufacturingOptionsToggle={showManufacturingOptionsToggle}
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

    function handleShowManufacturerOptionsCheck() {
        if (showManufacturingOptions) {
            if (getQuestionData().prereqVal.length) {
                let preReqArr = getQuestionData().prereqVal.split(',');

                const standardPrereqOptionsArr = Object.values(standardPrereqOptions);

                const prereqAnswers = standardPrereqOptionsArr.reduce((acc, currOption) => {
                    const { options } = currOption;
                    const optionTexts = options.map(({ text }) => text);

                    return acc.concat(optionTexts);
                }, []);

                const removedManufacturerOptions = preReqArr.filter(answer =>
                    prereqAnswers.includes(answer),
                );

                updateQuestionField('prereqDropdownValues', removedManufacturerOptions);
            }

            setShowManufacturingOptions(false);
        } else {
            setShowManufacturingOptions(true);
        }
    }
};

export default withSetQuestion(AddTemplateQuestionModalContainer);
