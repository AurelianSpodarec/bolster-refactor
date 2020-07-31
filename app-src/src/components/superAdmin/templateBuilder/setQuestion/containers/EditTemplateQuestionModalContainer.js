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

        const prereqOptions = this._getPrereqOptions();
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
                prereqVal={prereqVal}
                isPrerequisiteMulti={isPrerequisiteMulti}
                statusOptions={statusOptions}
                prereqOptions={Object.values(prereqOptions)}
                selectedPrereq={prereqOptions[prereqUUID]}
                questionType={questionTypeOptions[questionType]}
                questionTypeOptions={questionOptions}
                hideModal={hideModal}
                handleInputChange={handleInputChange}
                handleSubmit={this.handleSubmit}
                action="Edit"
                handlePrefillStatusChange={handlePrefillStatusChange}
                handlePrefillStatusValueChange={handlePrefillStatusValueChange}
                showStatusPrefillOptions={showStatusPrefillOptions}
            />
        );
    }
    componentDidMount = () => {
        const { question, updateQuestionFields } = this.props;
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
            updateQuestionFields({
                ...question,
                prereqVal: question.prereqVal.split(','),
                prereqDropdownValues: question.prereqVal.split(','),
            });
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

    _getPrereqOptions = () => {
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
