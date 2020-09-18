import React, { Component, useEffect } from 'react';

import withSetQuestion from '../hocs/withSetQuestion';
import { convertArrToObj } from 'helpers/generic';
import {
    PREREQ_TYPES,
    QUESTION_TYPE_NUMBERS,
    QUESTION_TYPE_VALUES,
} from 'constants/shared/templateBuilder';
import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';

const EditTemplateQuestionModalContainerFN = ({
    fields: { questionType, questionTypeOptions, prereqUUID, ...fields },
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
}) => {
    useEffect(() => {
        console.log({ question });
    }, []);

    return (
        <TemplateQuestionFormModal
            action="Edit"
            {...fields}
            statusOptions={statusOptions}
            prereqOptions={_getPrereqOptions()}
            selectedPrereq={prereqUUID}
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
};

export default withSetQuestion(EditTemplateQuestionModalContainerFN);

class TemplateQuestionModalContainer extends Component {
    render() {
        const {
            fields: {
                questionType,
                questionTypeOptions,
                prereqUUID,

                ...fields
            },
            hideModal,
            handleInputChange,
        } = this.props;

        const standardPrereqOptions = this._getStandardPrereqOptions();
        const allPrereqOptions = this._getAllPrereqOptions();

        const questionOptions = Object.values(questionTypeOptions).filter(
            ({ value }) =>
                +value !== QUESTION_TYPE_NUMBERS.STATUS &&
                +value !== QUESTION_TYPE_NUMBERS.STATIC_IMAGE,
        );
        const {
            statusOptions,
            handlePrefillStatusChange,
            handlePrefillStatusValueChange,
        } = this.props;
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
                prereqOptions={
                    this.state.showManufacturingOptions
                        ? Object.values(allPrereqOptions)
                        : Object.values(standardPrereqOptions)
                }
                selectedPrereq={
                    this.state.showManufacturingOptions
                        ? allPrereqOptions[prereqUUID]
                        : standardPrereqOptions[prereqUUID]
                }
                statusOptions={statusOptions}
                questionType={questionTypeOptions[questionType]}
                questionTypeOptions={questionOptions}
                hideModal={hideModal}
                handleInputChange={handleInputChange}
                handleSubmit={this.handleSubmit}
                action="Edit"
                handlePrefillStatusChange={handlePrefillStatusChange}
                handlePrefillStatusValueChange={handlePrefillStatusValueChange}
                showStatusPrefillOptions={showStatusPrefillOptions}
                handleShowManufacturerOptionsCheck={this.handleShowManufacturerOptionsCheck}
                showManufacturingOptions={this.state.showManufacturingOptions}
                showManufacturingOptionsToggle={this.state.showManufacturingOptionsToggle}
            />
        );
    }

    componentDidMount = () => {
        const {
            question,
            updateQuestionFields,
            fields: { prereqUUID },
        } = this.props;
        const questionStatusPrefills = question.statusPrefills;

        let sortedPrefilStatuses;

        if (questionStatusPrefills && Object.keys(questionStatusPrefills).length) {
            sortedPrefilStatuses = Object.keys(questionStatusPrefills);

            if (question.questionType === QUESTION_TYPE_NUMBERS.CHECKBOX) {
                const convertedPrefillVals = {};

                for (const key in questionStatusPrefills) {
                    const value = questionStatusPrefills[key];

                    convertedPrefillVals[key] = value === 'true';
                }

                updateQuestionFields({
                    ...question,
                    prefillStatuses: sortedPrefilStatuses,
                    statusPrefills: convertedPrefillVals,
                });
            } else {
                updateQuestionFields({ ...question, prefillStatuses: sortedPrefilStatuses });
            }
        } else {
            updateQuestionFields({ ...question });
        }

        if (question.isPrerequisiteMulti && question.prereqVal) {
            const preReqArr = question.prereqVal.split(',');

            updateQuestionFields({
                ...question,
                prereqVal: preReqArr,
                prereqDropdownValues: preReqArr,
            });
        }
    };
}
