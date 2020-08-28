import React, { Component } from 'react';

import withSetQuestion from '../hocs/withSetQuestion';
import { convertArrToObj } from 'helpers/generic';
import {
    PREREQ_TYPES,
    QUESTION_TYPE_NUMBERS,
    QUESTION_TYPE_VALUES,
} from 'constants/shared/templateBuilder';
import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';

class TemplateQuestionModalContainer extends Component {
    state = {
        showManufacturingOptions: false,
    };

    render() {
        const {
            fields: {
                questionType,
                questionTypeOptions,
                prereqUUID,
                prereqVal,
                isPrerequisiteMulti,
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
            />
        );
    }
    componentDidMount = () => {
        const { standardPrereqOptions, question, updateQuestionFields } = this.props;
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
            updateQuestionFields(question);
        }

        if (question.isPrerequisiteMulti && question.prereqVal) {
            let preReqArr = question.prereqVal.split(',');

            const standardPrereqOptionsArr = Object.values(standardPrereqOptions);

            const prereqAnswers = standardPrereqOptionsArr.reduce((acc, currOption) => {
                const { options } = currOption;
                const optionTexts = options.map(({ text }) => text);

                return acc.concat(optionTexts);
            }, []);

            updateQuestionFields({
                ...question,
                prereqVal: preReqArr,
                prereqDropdownValues: preReqArr,
            });

            if (
                preReqArr.some(answer => {
                    return prereqAnswers.some(prereqOptions => prereqOptions !== answer);
                })
            ) {
                this.setState({
                    showManufacturingOptions: false,
                });
            }
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const { setQuestion, question, getQuestionData } = this.props;

        const newQuestion = {
            ...question,
            ...getQuestionData(),
        };
        setQuestion(newQuestion);
    };

    handleShowManufacturerOptionsCheck = () => {
        const { showManufacturingOptions } = this.state;
        const { updateQuestionFields, question, standardPrereqOptions } = this.props;

        let preReqArr = question.prereqVal.split(',');

        const standardPrereqOptionsArr = Object.values(standardPrereqOptions);

        const prereqAnswers = standardPrereqOptionsArr.reduce((acc, currOption) => {
            const { options } = currOption;
            const optionTexts = options.map(({ text }) => text);

            return acc.concat(optionTexts);
        }, []);

        if (showManufacturingOptions) {
            const removedManufacturerOptions = preReqArr.filter(answer =>
                prereqAnswers.includes(answer),
            );

            updateQuestionFields({
                ...question,
                prereqVal: removedManufacturerOptions,
                prereqDropdownValues: removedManufacturerOptions,
            });

            this.setState({
                showManufacturingOptions: false,
            });
        } else {
            this.setState({
                showManufacturingOptions: true,
            });
        }
    };

    _getAllPrereqOptions = () => {
        const {
            questions,
            templateUUID: temUuid,
            companyDropdownOptions: { dropdownOptions },
            companyManufacturerOptions,
        } = this.props;

        const options = questions
            .filter(q => q.templateUUID === temUuid)
            .filter(q => PREREQ_TYPES.includes(q.questionType + ''))
            .map(function ({ uuid, name, questionType, options, optionType }) {
                const manufacturerOptions = companyManufacturerOptions
                    .filter(
                        companyManufacturerOption => companyManufacturerOption.type === optionType,
                    )
                    .map(({ name, id }) => ({
                        text: name,
                        value: id,
                    }));

                const defaultDropdownOptions = dropdownOptions
                    .filter(dropdownOption => dropdownOption.type === optionType)
                    .map(({ name }) => ({
                        text: name,
                        value: name,
                    }));

                const allDropdownOptions = [...manufacturerOptions, ...defaultDropdownOptions];

                if (optionType) {
                    return {
                        value: uuid,
                        text: name,
                        isStatus: questionType + '' === QUESTION_TYPE_VALUES.STATUS,
                        questionType,
                        options: allDropdownOptions,
                    };
                } else {
                    return {
                        value: uuid,
                        text: name,
                        isStatus: questionType + '' === QUESTION_TYPE_VALUES.STATUS,
                        questionType,
                        options: options ? options : [],
                    };
                }
            });

        return convertArrToObj(options, 'value');
    };
    _getStandardPrereqOptions = () => {
        const {
            questions,
            question: { templateUUID, uuid },
            companyDropdownOptions: { dropdownOptions },
        } = this.props;

        const options = questions
            .filter(
                q =>
                    q.templateUUID === templateUUID &&
                    PREREQ_TYPES.includes(q.questionType + '') &&
                    q.uuid !== uuid &&
                    q.prereqUUID !== uuid,
            )
            .map(function ({ uuid, name, questionType, options, optionType }) {
                if (optionType) {
                    return {
                        value: uuid,
                        text: name,
                        isStatus: questionType + '' === QUESTION_TYPE_VALUES.STATUS,
                        questionType,
                        options: dropdownOptions
                            .filter(dropdownOption => dropdownOption.type === optionType)
                            .map(({ name }) => ({
                                text: name,
                                value: name,
                            })),
                    };
                } else {
                    return {
                        value: uuid,
                        text: name,
                        isStatus: questionType + '' === QUESTION_TYPE_VALUES.STATUS,
                        questionType,
                        options: options ? options : [],
                    };
                }
            });

        return convertArrToObj(options, 'value');
    };
}

export default withSetQuestion(TemplateQuestionModalContainer);
