import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

import updateAddPinStatus from 'actions/companyAdmin/drawings/sync/updateAddPinStatus';
import { withRouter } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import resetPinAnswer from 'actions/companyAdmin/drawings/sync/resetPinAnswer';
import { isEmpty } from 'helpers/generic';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import { fieldTypes, getDefaultValue } from '../fieldTypes/allFieldTypes';
import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
const {
    SINGLE_LINE,
    SINGLE_PHOTO,
    MULTI_PHOTO,
    STATUS,
    DROPDOWN_OPTIONS,
    MULTI_DROPDOWN_OPTIONS,
    MULTI_MULTI_DROPDOWN_OPTIONS,
    STATIC_IMAGE
} = QUESTION_TYPE_VALUES;

const dropdownOptionTypes = [
    DROPDOWN_OPTIONS,
    MULTI_DROPDOWN_OPTIONS,
    MULTI_MULTI_DROPDOWN_OPTIONS
];

class AddPinQuestionRoute extends Component {
    state = {
        sigPad: {},
        originalDropdownMultiAns: [],
        originalDropdownAns: ''
    };

    render() {
        const {
            question,
            answers,
            dropdownOptions,
            status,
            selectedVersion,
            edit,
            resetPinAnswer,
            isHistory
        } = this.props;

        const showPreReq = this.checkIfShouldShowByPreReq();

        const isImage = `${question.type}` === STATIC_IMAGE;

        const fieldSize = `size-lg-${isImage ? '12' : '6'}`;
        const questionName = isImage ? '' : question.name;

        if (showPreReq) {
            const SpecificField =
                fieldTypes[question.type + ''] || fieldTypes[SINGLE_LINE];

            const extraImageClasses =
                (edit && question.type + '' === MULTI_PHOTO) ||
                    question.type + '' === SINGLE_PHOTO
                    ? 'photo-view'
                    : '';

            const isRequired = this._getIsRequired();
            return (
                <Field
                    key={question.id}
                    name={questionName}
                    sizeClasses={`${fieldSize} flex-row-item ${extraImageClasses} size-md-12`}
                    required={isRequired}
                >
                    <SpecificField
                        isRequired={isRequired}
                        statusOptions={selectedVersion.statusOptions}
                        question={question}
                        answers={answers}
                        status={status}
                        dropdownOptions={dropdownOptions}
                        handleChange={this.handleChange}
                        handleStatusChange={this.handleStatusChange}
                        handleImageClick={this.handleImageClick}
                        handleSignatureChange={this.handleSignatureChange}
                        sigPad={this.state.sigPad}
                        edit={edit}
                        resetPinAnswer={resetPinAnswer}
                        isHistory={isHistory}
                        originalDropdownAns={this.state.originalDropdownAns}
                        originalDropdownMultiAns={
                            this.state.originalDropdownMultiAns
                        }
                    />
                </Field>
            );
        }

        return null;
    }

    _getIsRequired = () => {
        const { question, status } = this.props;
        const { isRequired, isRequiredVal, type } = question;

        const showPreReq = this.checkIfShouldShowByPreReq();

        if (!showPreReq) return false;
        if (`${type}` === STATUS) return true;
        if (isRequired) return true;
        if (isRequiredVal) return `${isRequiredVal}` === `${status}`;

        return false;
    };

    checkIfShouldShowByPreReq = () => {
        const { question, status, questions, answers } = this.props;
        const { id: currentQuestionID, prerequisiteQuestionID } = question;

        const preReqQuestion = questions[prerequisiteQuestionID];
        let preReqAnswer = answers[prerequisiteQuestionID];
        const curQuestion = questions[currentQuestionID];

        if (!preReqQuestion) {
            return true;
        }

        if (`${preReqQuestion.type}` === STATUS) {
            return `${question.prerequisiteQuestionValue}` === `${status}`;
        }

        if (`${preReqQuestion.type}` === QUESTION_TYPE_VALUES.CHECKBOX) {
            //Convert true to 'true'
            preReqAnswer = `${preReqAnswer}`;
        }

        if (
            `${preReqQuestion.type}` === QUESTION_TYPE_VALUES.DROPDOWN ||
            `${preReqQuestion.type}` === QUESTION_TYPE_VALUES.RADIO
        ) {
            //For a drop down we have to convert the GUID to the question option.
            const selectedOption = preReqQuestion.options.find(
                option => option.id === preReqAnswer
            );
            // specifying not undefined in case pre-req answers are falsy ie. 0, ''
            if (selectedOption !== undefined) {
                preReqAnswer = selectedOption.text;
            } else {
                return false;
            }
        }

        if (`${preReqQuestion.type}` === QUESTION_TYPE_VALUES.MULTI_DROPDOWN) {
            if (!preReqAnswer) {
                return false;
            }

            const retArray = [];

            preReqAnswer.forEach(curAnswer => {
                const selectedOption = preReqQuestion.options.find(
                    option => option.id === curAnswer
                );

                if (selectedOption !== undefined) {
                    retArray.push(selectedOption.text);
                }
            });

            preReqAnswer = retArray;
        }

        if (Array.isArray(preReqAnswer)) {
            const lowerCaseAnswers = preReqAnswer.map(answer =>
                `${answer}`.toLowerCase()
            );
            if (
                lowerCaseAnswers.includes(
                    `${curQuestion.prerequisiteQuestionValue}`.toLowerCase()
                )
            ) {
                return true;
            }
        } else {
            if (curQuestion.prerequisiteQuestionValue === preReqAnswer) {
                //Exactly matches value
                return true;
            }
        }
        return false;
    };

    componentDidMount = () => {
        this.handlePrefillOrReset();
    };

    componentDidUpdate = prevProps => {
        const {
            question,
            answers,
            resetPinAnswer,
            oldAnswers,
            updateAddPinAnswer,
            updateAddPinStatus,
            history,
            status,
            pins,
            isFetchingPins,
            addFieldError,
            removeFieldError,
            fieldErrors,
            edit,
            historyID,
            template
        } = this.props;

        const isShowingFromPrereq = this.checkIfShouldShowByPreReq();
        const answer = answers[question.id];
        const answerName = `answer-${question.id}`;

        if (!isShowingFromPrereq && answer) {
            resetPinAnswer(question.id, getDefaultValue(question));
        }

        const hasStatusChanged = prevProps.status !== status;
        if (`${question.type}` !== STATUS && hasStatusChanged) {
            const isRequiredButEmpty = this._getIsRequired() && isEmpty(answer);

            if (isRequiredButEmpty && isShowingFromPrereq) {
                addFieldError(answerName, 'This is a required field.');
            } else {
                removeFieldError(answerName);
            }
        }

        // * remove error if the question is no longer showing
        const hasError = fieldErrors[answerName];
        if (hasError && !isShowingFromPrereq) {
            removeFieldError(answerName);
        }

        const isDoneFetchingPins =
            prevProps.isFetchingPins && !isFetchingPins && !isEmpty(pins);

        // ? only applies to edit
        if (isDoneFetchingPins && edit && history.id && oldAnswers) {
            const oldAnswersArray = Object.values(oldAnswers);

            // !pin history ID matters to select the right answer to prefill on edit
            const oldAnswer = oldAnswersArray.find(
                ({ templateQuestionID, pinHistoryID }) =>
                    templateQuestionID === question.id &&
                    pinHistoryID === Number(historyID)
            );
            if (oldAnswer) {
                const { templateQuestionID, answer } = oldAnswer;
                updateAddPinAnswer(templateQuestionID, answer);
                if (
                    question.type + '' === MULTI_DROPDOWN_OPTIONS ||
                    question.type + '' === MULTI_MULTI_DROPDOWN_OPTIONS
                ) {
                    if (Array.isArray(answer)) {
                        this.setState({ originalDropdownMultiAns: answer });
                    }
                }
                if (question.type + '' === DROPDOWN_OPTIONS) {
                    this.setState({ originalDropdownAns: answer });
                }
            }
            if (String(question.type) === STATUS) {
                updateAddPinStatus(history.status);
            }
        } else {
            const hasTemplateAppeared = !prevProps.template && !!template;
            const hasTemplateChanged =
                !!prevProps.template && prevProps.template.id !== template.id;
            const shouldReset =
                hasTemplateAppeared || hasTemplateChanged || isDoneFetchingPins;

            if (shouldReset) {
                this.handlePrefillOrReset();
            }
        }
    };

    handlePrefillOrReset = () => {
        const { isSameTemplate, pinAnswersByGroupKey } = this.props;

        const isAddPinHistory = !!pinAnswersByGroupKey;

        if (isSameTemplate && isAddPinHistory) {
            this.handlePrefillSameTemplateQuestion();
        } else if (isAddPinHistory) {
            this.handlePrefillDifferentTemplateQuestion();
        } else {
            this.handleResetAnswer();
        }
    };

    handlePrefillSameTemplateQuestion = () => {
        const {
            pinAnswersByGroupKey,
            question,
            updateAddPinAnswer
        } = this.props;
        const isDropdownOptions = dropdownOptionTypes.includes(
            `${question.type}`
        );
        const oldAnswersKeys = Object.keys(pinAnswersByGroupKey);

        if (`${question.type}` === STATUS) {
            this.handleStatusPrefill();
        } else if (oldAnswersKeys.includes(question.groupKey)) {
            const oldAnswer = pinAnswersByGroupKey[question.groupKey].answer;
            const answerToPrefill = isDropdownOptions
                ? this.getDropdownPrefillAnswer(oldAnswer)
                : oldAnswer;
            updateAddPinAnswer(question.id, answerToPrefill);
        } else {
            this.handleResetAnswer();
        }
    };

    handlePrefillDifferentTemplateQuestion = () => {
        const {
            oldAnswersByNameObj,
            question,
            questions,
            sectionIDs,
            updateAddPinAnswer
        } = this.props;

        const isDropdownOptions = dropdownOptionTypes.includes(
            `${question.type}`
        );
        const oldAnswersMatchingName = oldAnswersByNameObj[question.name] || [];
        const oldAnswersMatchingNameAndType = oldAnswersMatchingName.filter(
            ({ type }) => type === question.type
        );

        if (`${question.type}` === STATUS) {
            this.handleStatusPrefill();
        } else if (oldAnswersMatchingNameAndType.length) {
            const questionsMatchingNameAndType = Object.values(
                questions
            ).filter(
                outerQuestion =>
                    outerQuestion.type === question.type &&
                    outerQuestion.name === question.name &&
                    sectionIDs.includes(outerQuestion.templateSectionID)
            );
            const thisQuestionIndex = questionsMatchingNameAndType.findIndex(
                matchedQuestion => matchedQuestion.id === question.id
            );

            const matchedAnswer =
                oldAnswersMatchingNameAndType[thisQuestionIndex];
            if (matchedAnswer) {
                const answerToPrefill = isDropdownOptions
                    ? this.getDropdownPrefillAnswer(matchedAnswer.answer)
                    : matchedAnswer.answer;
                return updateAddPinAnswer(question.id, answerToPrefill);
            } else {
                this.handleResetAnswer();
            }
        } else {
            this.handleResetAnswer();
        }
    };

    handleResetAnswer = () => {
        const { question, updateAddPinAnswer } = this.props;
        updateAddPinAnswer(question.id, getDefaultValue(question));
    };

    handleStatusPrefill = () => {
        const { selectedVersion, latestPinHistory } = this.props;
        if (!latestPinHistory) return;
        if (selectedVersion.statusOptions.includes(latestPinHistory.status)) {
            this.handleStatusChange(null, latestPinHistory.status);
        }
    };

    getDropdownPrefillAnswer = answer => {
        // * handles dropdown options which have been removed
        const { question, dropdownOptionsByType } = this.props;
        const { type, optionType } = question;

        const relevantOptions = dropdownOptionsByType[optionType];
        if (`${type}` === DROPDOWN_OPTIONS) {
            // handle edge case where answer is an array, set asfirst element in array
            if (Array.isArray(answer)) [answer] = answer;
            if (relevantOptions.includes(answer)) {
                return answer;
            }
        } else if (!isEmpty(answer)) {
            const filteredAnswers = answer.filter(option =>
                relevantOptions.includes(option)
            );
            return filteredAnswers;
        }
        return getDefaultValue(question);
    };

    handleChange = (_, value) => {
        const { updateAddPinAnswer, question } = this.props;
        updateAddPinAnswer(question.id, value);
    };

    handleSignatureChange = d => {
        const { updateAddPinAnswer, question } = this.props;
        updateAddPinAnswer(question.id, d);
    };

    handleStatusChange = (_, val) => {
        const { updateAddPinStatus } = this.props;
        updateAddPinStatus(val);
    };

    handleFileChange = (_, s3Key) => {
        const { updateAddPinAnswer, question, answers } = this.props;
        if (+question.type === +QUESTION_TYPE_VALUES.MULTI_PHOTO) {
            const curAnswer = answers[question.id] || [];
            //Multi File
            const existing = curAnswer.includes(s3Key);
            if (existing) {
                //Delete
                updateAddPinAnswer(
                    question.id,
                    curAnswer.filter(item => item !== s3Key)
                );
            } else {
                //Add
                updateAddPinAnswer(question.id, [...curAnswer, s3Key]);
            }
        } else {
            const shouldDeleteFile = answers[question.id] === s3Key;
            updateAddPinAnswer(question.id, shouldDeleteFile ? '' : s3Key);
        }
    };

    handleImageClick = imgURL => {
        const { showModal } = this.props;
        showModal(PIN_IMAGE, imgURL);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            addPinDropdownOptions: { dropdownOptions },
            addPinFormReducer: { answers, status },
            templateQuestionsReducer: { questions },
            pinAnswersReducer: { answers: oldAnswers },
            pinHistoriesReducer: { histories },
            pinsReducer: { pins, isFetching: isFetchingPins }
        },
        shared: {
            fieldErrorsReducer: { fieldErrors }
        }
    },
    { match: { params } }
) => ({
    dropdownOptions,
    answers,
    questions,
    oldAnswers,
    status,
    pins,
    isFetchingPins,
    fieldErrors,
    // only applies to edit history
    history: histories[params.historyID] || {},
    historyID: params.historyID
});

const mapDispatchToProps = {
    updateAddPinAnswer,
    resetPinAnswers,
    resetPinAnswer,
    updateAddPinStatus,
    addFieldError,
    showModal,
    removeFieldError
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddPinQuestionRoute)
);
