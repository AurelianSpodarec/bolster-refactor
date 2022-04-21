import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

import updateAddPinStatus from 'actions/companyAdmin/drawings/sync/updateAddPinStatus';
import { withRouter } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import resetPinAnswer from 'actions/companyAdmin/drawings/sync/resetPinAnswer';
import { boolToYesNo, deepEquals, isEmpty } from 'helpers/generic';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import { fieldTypes, getDefaultValue } from '../fieldTypes/allFieldTypes';
import {
    QUESTION_TYPE_VALUES,
    QUESTION_TYPE_NUMBERS,
    QUESTION_TYPE_NUMBERS as TYPES,
} from 'constants/shared/templateBuilder';
import { FILE_STORAGE_URL, RAW_S3_STORAGE_URL } from '../../../../../config';
import ButtonContainer from '../../../generic/button/containers/ButtonContainer';
import { emptyAnswer } from '../fieldTypes/helpers';

const {
    SINGLE_LINE,
    SINGLE_PHOTO,
    MULTI_PHOTO,
    STATUS,
    PIN_OPTION_TYPES,
    MULTI_PIN_OPTION_TYPES,
    MULTI_MULTI_PIN_OPTION_TYPES,
    STATIC_IMAGE,
    RADIO,
    DROPDOWN,
    MULTI_DROPDOWN,
} = QUESTION_TYPE_VALUES;

const dropdownOptionTypes = [
    PIN_OPTION_TYPES,
    MULTI_PIN_OPTION_TYPES,
    MULTI_MULTI_PIN_OPTION_TYPES,
];

class AddPinQuestionRoute extends Component {
    state = {
        sigPad: {},
        originalDropdownMultiAns: [],
        originalDropdownAns: '',
    };

    render() {
        const {
            question,
            answers,
            dropdownOptions,
            optionValues,
            status,
            selectedVersion,
            edit,
            resetPinAnswer,
            isHistory,
            drawing,
            companySettings,
            companyID,
            pinOptions,
        } = this.props;

        const showPreReq = this.checkIfShouldShowByPreReq();

        const isImage = `${question.type}` === STATIC_IMAGE;

        const fieldSize = `size-lg-${isImage ? '12' : '6'}`;
        const questionName = isImage ? '' : question.name;
        const isManufacturingEnabledForDrawing = drawing.isManufacturingEnabled;

        if (showPreReq) {
            const SpecificField = fieldTypes[question.type + ''] || fieldTypes[SINGLE_LINE];

            const extraImageClasses =
                (edit && question.type + '' === MULTI_PHOTO) || question.type + '' === SINGLE_PHOTO
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
                        optionValues={optionValues}
                        handleChange={this.handleChange}
                        handleStatusChange={this.handleStatusChange}
                        handleImageClick={this.handleImageClick}
                        handleSignatureChange={this.handleSignatureChange}
                        sigPad={this.state.sigPad}
                        edit={edit}
                        resetPinAnswer={resetPinAnswer}
                        isHistory={isHistory}
                        originalDropdownAns={this.state.originalDropdownAns}
                        originalDropdownMultiAns={this.state.originalDropdownMultiAns}
                        isManufacturingEnabledForDrawing={isManufacturingEnabledForDrawing}
                        defaultDropdownSorting={companySettings.defaultDropdownSorting}
                        companyID={companyID}
                        pinOptions={pinOptions}
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

    // not just an if check, amends the pre req answer also?
    checkIfShouldShowByPreReq = () => {
        const { question, status, questions, answers, pinOptionVersions } = this.props;
        const { prerequisiteQuestionIDs } = question;
        const prereqIDArr = (prerequisiteQuestionIDs || '').split(',');
        const preReqQuestions = Object.values(questions).filter(ques =>
            prereqIDArr.includes(`${ques.id}`),
        );

        if (!question.prerequisiteQuestionValue) {
            return true;
        }
        if (!preReqQuestions.length) {
            return true;
        }

        return preReqQuestions.every(preReqQuestion => {
            const preReqType = `${preReqQuestion.type}`;
            const prereqVals = question.prerequisiteQuestionValue.split(',');
            let preReqAnswers = answers[preReqQuestion.id];

            if (preReqType === STATUS && prereqVals.includes(`${status}`)) {
                return true;
            }

            if (!preReqAnswers || !preReqAnswers.length) {
                return false;
            }

            if ([DROPDOWN, MULTI_DROPDOWN, RADIO].includes(preReqType)) {
                preReqAnswers = preReqAnswers?.map(ans => ans.textValue);
            }

            if (
                [PIN_OPTION_TYPES, MULTI_PIN_OPTION_TYPES, MULTI_MULTI_PIN_OPTION_TYPES].includes(
                    preReqType,
                )
            ) {
                preReqAnswers = preReqAnswers?.map(ans => ans.pinOptionVersionID);
            }

            return preReqAnswers.some(answer =>
                prereqVals.some(val => {
                    if (!val.includes('#PREREQ_ID_')) {
                        return val.toLowerCase() === `${answer}`.toLowerCase();
                    }
                    const isIDValue = typeof val === 'number';
                    const answerToCompare = isIDValue ? pinOptionVersions[answer]?.name : answer;
                    return (
                        val.toLowerCase() ===
                        `${answerToCompare}#PREREQ_ID_${preReqQuestion.id}`.toLowerCase()
                    );
                }),
            );
        });
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
            template,
            areManufacturerOptionsIncluded,
            optionValues,
        } = this.props;

        const isShowingFromPrereq = this.checkIfShouldShowByPreReq();
        const answer = answers[question.id];
        const answerName = `answer-${question.id}`;

        if (
            !isShowingFromPrereq &&
            !isEmpty(answer) &&
            !deepEquals(answer, getDefaultValue(question))
        ) {
            resetPinAnswer(question.id, getDefaultValue(question));
        }

        const hasStatusChanged = prevProps.status !== status;
        if (`${question.type}` !== STATUS && hasStatusChanged) {
            // * handle isrequiredbasedonstatus
            const isRequiredButEmpty = this._getIsRequired() && isEmpty(answer);

            if (isRequiredButEmpty && isShowingFromPrereq) {
                addFieldError(answerName, 'This is a required field.');
            } else {
                removeFieldError(answerName);
            }
            // * handle prefillfromstatus

            if (question.statusPrefills[status]) {
                if (question.type === QUESTION_TYPE_NUMBERS.CHECKBOX) {
                    const convertedPrefillVals = {};

                    for (const key in question.statusPrefills) {
                        const value = question.statusPrefills[key];

                        convertedPrefillVals[key] = value === 'true';
                    }
                    updateAddPinAnswer(question.id, convertedPrefillVals[status]);
                } else {
                    updateAddPinAnswer(question.id, question.statusPrefills[status]);
                }
            } else {
                // handle reset if was, but should no longer be prefilled
                if (prevProps.question.statusPrefills[prevProps.status]) {
                    resetPinAnswer(question.id, getDefaultValue(question));
                }
            }
        }

        // * remove error if the question is no longer showing
        const hasError = fieldErrors[answerName];
        if (hasError && !isShowingFromPrereq) {
            removeFieldError(answerName);
        }

        const isDoneFetchingPins = prevProps.isFetchingPins && !isFetchingPins && !isEmpty(pins);
        const isDoneIncludingManufacturerOptions =
            prevProps.areManufacturerOptionsIncluded &&
            !areManufacturerOptionsIncluded &&
            !isEmpty(optionValues);

        // ? only applies to edit

        if (isDoneFetchingPins && edit && history.id && oldAnswers) {
            const oldAnswersArray = Object.values(oldAnswers);

            // !pin history ID matters to select the right answer to prefill on edit
            const oldAnswer = oldAnswersArray.find(
                ({ templateQuestionID, pinHistoryID }) =>
                    templateQuestionID === question.id && pinHistoryID === Number(historyID),
            );
            if (oldAnswer) {
                const { templateQuestionID, answer } = oldAnswer;
                updateAddPinAnswer(templateQuestionID, answer);

                // preventing stealth prefill manufacturer with non manufacturing answers & vice versa

                if (
                    question.type + '' === MULTI_PIN_OPTION_TYPES ||
                    question.type + '' === MULTI_MULTI_PIN_OPTION_TYPES
                ) {
                    if (Array.isArray(answer)) {
                        this.setState({ originalDropdownMultiAns: answer });
                    }
                }
                if (question.type + '' === PIN_OPTION_TYPES) {
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
                hasTemplateAppeared ||
                hasTemplateChanged ||
                isDoneFetchingPins ||
                isDoneIncludingManufacturerOptions;

            if (shouldReset) {
                this.handlePrefillOrReset();
            }
        }
    };

    handlePrefillOrReset = () => {
        const {
            isSameTemplate,
            pinAnswersByGroupKey,
            cachedAnswers = {},
            updateAddPinAnswer,
            question,
        } = this.props;
        const cachedAnswer = cachedAnswers?.[question.id];
        const isAddPinHistory = !!pinAnswersByGroupKey;

        if (isSameTemplate && isAddPinHistory) {
            this.handlePrefillSameTemplateQuestion();
        } else if (isAddPinHistory) {
            this.handlePrefillDifferentTemplateQuestion();
        } else if (!!cachedAnswer && question.isPrefill) {
            updateAddPinAnswer(question.id, cachedAnswer);
        } else {
            this.handleResetAnswer();
        }
    };

    handlePrefillSameTemplateQuestion = () => {
        const { pinAnswersByGroupKey, question, updateAddPinAnswer } = this.props;

        const isDropdownOptions = dropdownOptionTypes.includes(`${question.type}`);
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
        const { oldAnswersByNameObj, question, questions, sectionIDs, updateAddPinAnswer } =
            this.props;

        const isDropdownOptions = dropdownOptionTypes.includes(`${question.type}`);
        const oldAnswersMatchingName = oldAnswersByNameObj[question.name] || [];
        const oldAnswersMatchingNameAndType = oldAnswersMatchingName.filter(
            ({ type }) => type === question.type,
        );

        if (`${question.type}` === STATUS) {
            this.handleStatusPrefill();
        } else if (oldAnswersMatchingNameAndType.length) {
            const questionsMatchingNameAndType = Object.values(questions).filter(
                outerQuestion =>
                    outerQuestion.type === question.type &&
                    outerQuestion.name === question.name &&
                    sectionIDs.includes(outerQuestion.templateSectionID),
            );
            const thisQuestionIndex = questionsMatchingNameAndType.findIndex(
                matchedQuestion => matchedQuestion.id === question.id,
            );

            const matchedAnswer = oldAnswersMatchingNameAndType[thisQuestionIndex];
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
        if (`${type}` === PIN_OPTION_TYPES) {
            // handle edge case where answer is an array, set asfirst element in array
            if (Array.isArray(answer)) [answer] = answer;
            if (relevantOptions.includes(answer)) {
                return answer;
            }
        } else if (!isEmpty(answer)) {
            if (!Array.isArray(answer)) answer = [answer];
            const filteredAnswers = answer.filter(option => relevantOptions.includes(option));
            return filteredAnswers;
        }
        return getDefaultValue(question);
    };

    handleChange = (_, value) => {
        const { updateAddPinAnswer, question } = this.props;
        const valueToStore = getValueForQuestionAnswer(question, value);
        updateAddPinAnswer(question.id, valueToStore);
    };

    handleSignatureChange = d => {
        const { updateAddPinAnswer, question } = this.props;
        updateAddPinAnswer(question.id, d);
    };

    handleStatusChange = (_, val) => {
        const { updateAddPinStatus } = this.props;
        updateAddPinStatus(val);
    };
    handleImageClick = imgURL => {
        const { showModal } = this.props;
        showModal(PIN_IMAGE, imgURL);
    };
}

const getValueForQuestionAnswer = (question, value) => {
    switch (question.type) {
        case TYPES.SINGLE_LINE:
        case TYPES.MULTI_LINE:
        case TYPES.DROPDOWN:
        case TYPES.RADIO: {
            // single text answer
            const answer = {
                ...emptyAnswer,
                textValue: value,
            };
            return [answer];
        }
        case TYPES.MULTI_DROPDOWN:
        case TYPES.MULTI_MULTI_DROPDOWN: {
            // multi text answer
            return value.map(ans => ({
                ...emptyAnswer,
                textValue: ans,
            }));
        }
        case TYPES.PIN_OPTION_TYPES: {
            // single option answer
            const answer = {
                ...emptyAnswer,
                pinOptionVersionID: value,
            };
            return [answer];
        }
        case TYPES.MULTI_PIN_OPTION_TYPES:
        case TYPES.MULTI_MULTI_PIN_OPTION_TYPES: {
            // multi option answer
            return value.map(ans => ({
                ...emptyAnswer,
                pinOptionVersionID: ans,
            }));
        }
        case TYPES.NUMBER: {
            // single number answer
            const answer = {
                ...emptyAnswer,
                numericValue: value,
            };
            return [answer];
        }
        case TYPES.CHECKBOX: {
            // bool value
            const answer = {
                ...emptyAnswer,
                booleanValue: value,
            };
            return [answer];
        }
        case TYPES.SIGNATURE: {
            // base64/s3key
            const isS3Key = value.includes('.');
            const keyName = isS3Key ? 's3KeyValue' : 'base64Value';
            const answer = {
                ...emptyAnswer,
                [keyName]: value,
            };
            return [answer];
        }
        case TYPES.SINGLE_PHOTO:
        case TYPES.DOCUMENT_UPLOAD: {
            // single s3
            const answer = {
                ...emptyAnswer,
                s3KeyValue: value,
            };
            return [answer];
        }
        case TYPES.MULTI_PHOTO: {
            // multi s3
            return value.map(ans => ({
                ...emptyAnswer,
                s3KeyValue: ans,
            }));
        }
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            manufacturersOptionValuesReducer: {
                manufacturersOptionValues,
                isFetching: isFetchingOptionValues,
            },
            addPinDropdownOptions: { dropdownOptions = [], areManufacturerOptionsIncluded },
            addPinFormReducer: { answers, status },
            templateQuestionsReducer: { questions },
            pinAnswersReducer: { answers: oldAnswers },
            pinHistoriesReducer: { histories },
            pinsReducer: { pins, isFetching: isFetchingPins },
            pinOptionVersionsReducer: { pinOptionVersions },
            drawingsReducer: { drawings },
            companySettingsReducer: { companySettings },
        },
        shared: {
            fieldErrorsReducer: { fieldErrors },
            decodeJWTReducer: {
                jwtData: { companyID },
            },
        },
    },
    { match: { params, url } },
) => ({
    optionValues: manufacturersOptionValues,
    areManufacturerOptionsIncluded,
    isFetchingOptionValues,
    dropdownOptions,
    answers,
    questions,
    oldAnswers,
    status,
    pins,
    isFetchingPins,
    fieldErrors,
    drawing:
        (url.endsWith('add-history') || url.includes('edit-history')) && pins[params.id]
            ? drawings[pins[params.id].drawingID]
            : drawings[params.id],
    // only applies to edit history
    history: histories[params.historyID] || {},
    historyID: params.historyID,
    companySettings,
    companyID,
    pinOptionVersions,
});

const mapDispatchToProps = {
    updateAddPinAnswer,
    resetPinAnswers,
    resetPinAnswer,
    updateAddPinStatus,
    addFieldError,
    showModal,
    removeFieldError,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPinQuestionRoute));
