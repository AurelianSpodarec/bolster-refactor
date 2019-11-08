import React, { Component, } from 'react';
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
import { fieldTypes } from '../fieldTypes/allFieldTypes';
import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
const {
    SINGLE_LINE,
    SINGLE_PHOTO,
    MULTI_PHOTO,
    STATUS,
    DROPDOWN_OPTIONS,
    MULTI_DROPDOWN_OPTIONS,
    MULTI_MULTI_DROPDOWN_OPTIONS,
} = QUESTION_TYPE_VALUES;


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
            questions,
            dropdownOptions,
            status,
            selectedVersion,
            edit,
            resetPinAnswer,
            isHistory
        } = this.props; 

        const showPreReq = this.checkIfShouldShowByPreReq(
            question.id,
            question.prerequisiteQuestionID,
            answers,
            questions
        );

        let fieldSize = 'size-lg-6';
        let questionName = question.name;

        if (question.type + '' === QUESTION_TYPE_VALUES.STATIC_IMAGE) {
            fieldSize = 'size-lg-12';
            questionName = '';
        }

        if (showPreReq) {
            const SpecificField = fieldTypes[question.type + ''] || fieldTypes[SINGLE_LINE];

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
                        handleFileChange={this.handleFileChange}
                        handleImageClick={this.handleImageClick}
                        handleSignatureChange={this.handleSignatureChange}
                        sigPad={this.state.sigPad}
                        edit={edit}
                        resetPinAnswer={resetPinAnswer}
                        isHistory={isHistory}
                        originalDropdownAns={this.state.originalDropdownAns}
                        originalDropdownMultiAns={this.state.originalDropdownMultiAns}
                    />
                </Field>
            );
        }

        return null;
    }

    _getIsRequired = () => {
        const {
            question: {
                isRequired,
                isRequiredVal,
                type,
                id,
                prerequisiteQuestionID
            },
            answers,
            questions,
            status
        } = this.props;

        const showPreReq = this.checkIfShouldShowByPreReq(
            id,
            prerequisiteQuestionID,
            answers,
            questions
        );

        if (!showPreReq) return false;
        if (`${type}` === `${STATUS}`) return true;
        if (isRequired) return true;
        if (isRequiredVal) return isRequiredVal + '' === status + '';

        return false;
    };

    checkIfShouldShowByPreReq = (
        currentQuestionID,
        prerequisiteQuestionID,
        answers,
        questions
    ) => {
        const { question, status } = this.props;
        const preReqQuestion = questions[prerequisiteQuestionID];
        let preReqAnswer = answers[prerequisiteQuestionID];
        const curQuestion = questions[currentQuestionID];

        if (!preReqQuestion) {
            return true;
        }

        if (`${preReqQuestion.type}` === STATUS) {
            return (
                `${question.prerequisiteQuestionValue}` === `${status}`
            );
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

        if (
            `${preReqQuestion.type}` === QUESTION_TYPE_VALUES.MULTI_DROPDOWN
        ) {
            const retArray = [];

            if (!preReqAnswer) {
                return false;
            }

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
            //TODO maybe so case in-sensitive check
            const lowerCaseAnswers = preReqAnswer.map(answer =>
                `${answer}`.toLowerCase()
            );
            if (
                lowerCaseAnswers.includes(
                    `${(curQuestion.prerequisiteQuestionValue)}`.toLowerCase()
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

    componentDidUpdate = prevProps => {
        const {
            question,
            answers,
            questions,
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
            historyID
        } = this.props;
        const prereq = this.checkIfShouldShowByPreReq(
            question.id,
            question.prerequisiteQuestionID,
            answers,
            questions
        );
        const answer = answers[question.id];

        if (!prereq && answer) resetPinAnswer(question.id);
        const answerName = `answer-${question.id}`;
        if (`${question.type}` !== `${STATUS}` && prevProps.status !== status) {
            this._getIsRequired() && isEmpty(answer) && prereq
                ? addFieldError(answerName, 'This is a required field.')
                : removeFieldError(answerName);
        }
        const error = fieldErrors[answerName];
        if (error && !prereq) {
            removeFieldError(answerName);
        }

        const isDoneFetchingPins =
            prevProps.isFetchingPins && !isFetchingPins && !isEmpty(pins);

        // ? only applies to edit
        if (isDoneFetchingPins && (history.id && oldAnswers && edit)) {
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
                if(question.type + '' === MULTI_DROPDOWN_OPTIONS ||
                 question.type + '' === MULTI_MULTI_DROPDOWN_OPTIONS) {
                    this.setState({originalDropdownMultiAns: answer});
                }
                if(question.type + '' === DROPDOWN_OPTIONS){
                    this.setState({originalDropdownAns: answer});
                }
            }
            if (String(question.type) === STATUS) {
                updateAddPinStatus(history.status);
            }
        }
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
        let curAnswer = answers[question.id];
        if (+question.type === +QUESTION_TYPE_VALUES.MULTI_PHOTO) {
            if (!curAnswer) {
                curAnswer = [];
            }
            //Multi File
            const existing = curAnswer.includes(s3Key);
            if (existing) {
                //Delete

                curAnswer = curAnswer.filter(item => item !== s3Key);

                updateAddPinAnswer(question.id, curAnswer);
            } else {
                //Add
                curAnswer.push(s3Key);
                updateAddPinAnswer(question.id, curAnswer);
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
    history: histories[params.historyID] || {},
    pins,
    isFetchingPins,
    fieldErrors,
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
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinQuestionRoute)
);
