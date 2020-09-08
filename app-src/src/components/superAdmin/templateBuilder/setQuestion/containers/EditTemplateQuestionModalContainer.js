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
        showManufacturingOptionsToggle: false,
        showManufacturingOptions: false,
    };

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

    componentDidUpdate = prevProps => {
        const {
            fields: { prereqUUID },
            getQuestionData,
            updateQuestionField,
        } = this.props;
        const standardPrereqOptions = this._getStandardPrereqOptions();
        const allPrereqOptions = this._getAllPrereqOptions();

        if (
            prevProps.fields.prereqUUID &&
            prevProps.fields.prereqUUID.length &&
            prevProps.fields.prereqUUID !== getQuestionData().prereqUUID
        ) {
            updateQuestionField('prereqVal', '');
            updateQuestionField('prereqDropdownValues', []);

            if (
                getQuestionData().prereqUUID &&
                standardPrereqOptions[getQuestionData().prereqUUID] &&
                standardPrereqOptions[getQuestionData().prereqUUID].options.length <
                    allPrereqOptions[getQuestionData().prereqUUID].options.length
            ) {
                this.setState({ showManufacturingOptionsToggle: true });
            } else {
                this.setState({ showManufacturingOptionsToggle: false });
            }
        }
    };

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
            const standardPrereqOptions = this._getStandardPrereqOptions();
            const allPrereqOptions = this._getAllPrereqOptions();

            let preReqArr = question.prereqVal.split(',');

            const standardPrereqOptionsArr = Object.values(standardPrereqOptions);
            const standardPrereqAnswers = standardPrereqOptionsArr.reduce((acc, currOption) => {
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
                    return standardPrereqAnswers.some(prereqOptions => prereqOptions !== answer);
                })
            ) {
                this.setState({
                    showManufacturingOptions: true,
                });
            }

            if (
                question.prereqUUID &&
                !standardPrereqAnswers[question.prereqUUID] &&
                allPrereqOptions[question.prereqUUID]
            ) {
                this.setState({ showManufacturingOptionsToggle: true });
                // console.log({
                //     hey: true,
                //     question,
                //     allPrereqOptions,
                //     prereqUUID: question.prereqUUID,
                //     allOptionsSelected: allPrereqOptions[question.prereqUUID],
                //     standardSelected: standardPrereqAnswers[question.prereqUUID],
                // });
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
        const { updateQuestionField, question, standardPrereqOptions } = this.props;
        if (question.prereqVal && question.prereqVal.length) {
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
                updateQuestionField('prereqVal', removedManufacturerOptions.join(','));
                updateQuestionField('prereqDropdownValues', removedManufacturerOptions);

                this.setState({
                    showManufacturingOptions: false,
                });
            } else {
                this.setState({
                    showManufacturingOptions: true,
                });
            }
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
                        isManufacturing: true,
                    }));
                const defaultDropdownOptions = dropdownOptions
                    .filter(dropdownOption => dropdownOption.type === optionType)
                    .map(({ name }) => ({
                        text: name,
                        value: name,
                        isManufacturing: false,
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
                // console.log({ questions, dropdownOptions, questionType });
                // console.log({ questions, dropdownOptions, questionType });
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
                                isManufacturing: false,
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
