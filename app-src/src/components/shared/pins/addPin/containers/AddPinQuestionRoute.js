import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';

import updateAddPinStatus from 'actions/companyAdmin/drawings/sync/updateAddPinStatus';
import { withRouter } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import resetPinAnswer from 'actions/companyAdmin/drawings/sync/resetPinAnswer';
import { componentDidMount, deepEquals, isEmpty } from 'helpers/generic';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import { fieldTypes, getDefaultValue } from '../fieldTypes/allFieldTypes';
import { QUESTION_TYPE_NUMBERS, QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import { getValueForQuestionAnswer } from '../fieldTypes/helpers';
import { usePrevious } from '../../../../../helpers/hooks';

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

const AddPinQuestionRoute = ({
    question,
    isSameTemplate,
    pinAnswersByGroupKey,
    cachedAnswers = {},
    oldAnswersByNameObj,
    sectionIDs,
    latestPinHistory,
    template,
    edit,
    isHistory,
    selectedVersion,
    pinOptions,
    match: { params },
}) => {
    const {
        answers,
        questions,
        oldAnswers,
        status,
        pins,
        isFetchingPins,
        fieldErrors,
        companySettings,
        companyID,
        pinOptionVersions,
        histories,
    } = useSelector(mapStateToProps);

    const { historyID } = params;
    const history = histories[historyID] || {};
    const dispatch = useDispatch();
    const [originalPinOptionAnswers, setOriginalPinOptionAnswers] = React.useState({});
    componentDidMount(() => handlePrefillOrReset());

    const answer = answers[question.id];
    const answerName = `answer-${question.id}`;
    const showPreReq = checkIfShouldShowByPreReq();

    const prevProps = usePrevious({ status, question, template, isFetchingPins });
    // handle reset answer when not showing from prerequisites
    useEffect(() => {
        const showPreReq = checkIfShouldShowByPreReq();
        if (!showPreReq && !isEmpty(answer) && !deepEquals(answer, getDefaultValue(question))) {
            dispatch(resetPinAnswer(question.id, getDefaultValue(question)));
        }
    }, [status, question, template, isFetchingPins, answer]);
    // handle reset answer when status changes
    useEffect(() => {
        const hasStatusChanged = prevProps.status !== status;
        if (`${question.type}` !== STATUS && hasStatusChanged) {
            // * handle isrequiredbasedonstatus
            const isRequiredButEmpty = _getIsRequired() && isEmpty(answer);

            if (isRequiredButEmpty && showPreReq) {
                dispatch(addFieldError(answerName, 'This is a required field.'));
            } else {
                dispatch(removeFieldError(answerName));
            }
            // * handle prefillfromstatus

            if (question.statusPrefills[status]) {
                if (question.type === QUESTION_TYPE_NUMBERS.CHECKBOX) {
                    const convertedPrefillVals = {};

                    for (const key in question.statusPrefills) {
                        const value = question.statusPrefills[key];

                        convertedPrefillVals[key] = value === 'true';
                    }
                    dispatch(updateAddPinAnswer(question.id, convertedPrefillVals[status]));
                } else {
                    dispatch(updateAddPinAnswer(question.id, question.statusPrefills[status]));
                }
            } else {
                // handle reset if was, but should no longer be prefilled
                if (prevProps.question.statusPrefills[prevProps.status]) {
                    dispatch(resetPinAnswer(question.id, getDefaultValue(question)));
                }
            }
        }
    }, [status, question, prevProps.question, prevProps.status, answerName, showPreReq]);

    // * remove error if the question is no longer showing
    useEffect(() => {
        const hasError = fieldErrors[answerName];
        if (hasError && !showPreReq) {
            dispatch(removeFieldError(answerName));
        }

        const isDoneFetchingPins = prevProps.isFetchingPins && !isFetchingPins && !isEmpty(pins);
        // ? only applies to edit

        if (isDoneFetchingPins && edit && history.id && oldAnswers) {
            const oldAnswersArray = Object.values(oldAnswers);

            // !pin history ID matters to select the right answer to prefill on edit
            const oldAnswer = oldAnswersArray.find(
                ({ templateQuestionID, pinHistoryID }) =>
                    templateQuestionID === question.id && pinHistoryID === Number(historyID),
            );
            if (oldAnswer) {
                const { templateQuestionID, answerValues } = oldAnswer;
                dispatch(updateAddPinAnswer(templateQuestionID, answerValues));
                if (
                    question.type + '' === PIN_OPTION_TYPES ||
                    question.type + '' === MULTI_PIN_OPTION_TYPES ||
                    question.type + '' === MULTI_MULTI_PIN_OPTION_TYPES
                ) {
                    setOriginalPinOptionAnswers(answerValues);
                }
            }
            if (String(question.type) === STATUS) {
                dispatch(updateAddPinStatus(history.status));
            }
        } else {
            const hasTemplateAppeared = !prevProps.template && !!template;
            const hasTemplateChanged = prevProps.template?.id !== template?.id;
            const shouldReset = hasTemplateAppeared || hasTemplateChanged || isDoneFetchingPins;

            if (shouldReset) {
                handlePrefillOrReset();
            }
        }
    }, [
        isFetchingPins,
        history,
        historyID,
        oldAnswers,
        prevProps.isFetchingPins,
        template,
        pins,
        showPreReq,
    ]);

    const isImage = `${question.type}` === STATIC_IMAGE;
    const questionName = isImage ? '' : question.name;

    if (showPreReq) {
        const SpecificField = fieldTypes[question.type] || fieldTypes[SINGLE_LINE];

        const extraImageClasses =
            (edit && question.type + '' === MULTI_PHOTO) || question.type + '' === SINGLE_PHOTO
                ? 'photo-view'
                : '';

        const fieldSize = `size-lg-${isImage ? '12' : '6'}`;
        const isRequired = _getIsRequired();
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
                    handleChange={handleChange}
                    handleStatusChange={handleStatusChange}
                    handleImageClick={handleImageClick}
                    handleSignatureChange={handleSignatureChange}
                    edit={edit}
                    resetPinAnswer={(id, val) => dispatch(resetPinAnswer(id, val))}
                    isHistory={isHistory}
                    originalPinOptionAns={originalPinOptionAnswers}
                    defaultDropdownSorting={companySettings.defaultDropdownSorting}
                    companyID={companyID}
                    pinOptions={pinOptions}
                />
            </Field>
        );
    }

    return null;

    function _getIsRequired() {
        const { isRequired, isRequiredVal, type } = question;

        const showPreReq = checkIfShouldShowByPreReq();

        if (!showPreReq) return false;
        if (`${type}` === STATUS) return true;
        if (isRequired) return true;
        if (isRequiredVal) return `${isRequiredVal}` === `${status}`;

        return false;
    }

    function checkIfShouldShowByPreReq() {
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
    }

    function handlePrefillOrReset() {
        const cachedAnswer = cachedAnswers?.[question.id];
        const isAddPinHistory = !!pinAnswersByGroupKey;

        if (isSameTemplate && isAddPinHistory) {
            handlePrefillSameTemplateQuestion();
        } else if (isAddPinHistory) {
            handlePrefillDifferentTemplateQuestion();
        } else if (!!cachedAnswer && question.isPrefill) {
            dispatch(updateAddPinAnswer(question.id, cachedAnswer));
        } else {
            handleResetAnswer();
        }
    }

    function handlePrefillSameTemplateQuestion() {
        const oldAnswersKeys = Object.keys(pinAnswersByGroupKey);

        if (`${question.type}` === STATUS) {
            handleStatusPrefill();
        } else if (oldAnswersKeys.includes(question.groupKey)) {
            const oldAnswer = pinAnswersByGroupKey[question.groupKey].answerValues;
            console.log({ oldAnswer, oldAnswersKeys, pinAnswersByGroupKey, question });
            dispatch(updateAddPinAnswer(question.id, oldAnswer));
        } else {
            handleResetAnswer();
        }
    }

    function handlePrefillDifferentTemplateQuestion() {
        dropdownOptionTypes.includes(`${question.type}`);
        const oldAnswersMatchingName = oldAnswersByNameObj[question.name] || [];
        const oldAnswersMatchingNameAndType = oldAnswersMatchingName.filter(
            ({ type }) => type === question.type,
        );

        if (`${question.type}` === STATUS) {
            handleStatusPrefill();
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
                return dispatch(updateAddPinAnswer(question.id, matchedAnswer.answerValues));
            } else {
                handleResetAnswer();
            }
        } else {
            handleResetAnswer();
        }
    }

    function handleResetAnswer() {
        dispatch(updateAddPinAnswer(question.id, getDefaultValue(question)));
    }

    function handleStatusPrefill() {
        if (!latestPinHistory) return;
        if (selectedVersion.statusOptions.includes(latestPinHistory.status)) {
            handleStatusChange(null, latestPinHistory.status);
        }
    }
    function handleChange(_, value) {
        const valueToStore = getValueForQuestionAnswer(question, value);
        dispatch(updateAddPinAnswer(question.id, valueToStore));
    }

    function handleSignatureChange(d) {
        handleChange(null, d);
    }

    function handleStatusChange(_, val) {
        dispatch(updateAddPinStatus(val));
    }
    function handleImageClick(imgURL) {
        dispatch(showModal(PIN_IMAGE, imgURL));
    }
};

const mapStateToProps = ({
    companyAdmin: {
        addPinFormReducer: { answers, status },
        templateQuestionsReducer: { questions },
        pinAnswersReducer: { answers: oldAnswers },
        pinHistoriesReducer: { histories },
        pinsReducer: { pins, isFetching: isFetchingPins },
        pinOptionVersionsReducer: { pinOptionVersions },
        companySettingsReducer: { companySettings },
    },
    shared: {
        fieldErrorsReducer: { fieldErrors },
        decodeJWTReducer: {
            jwtData: { companyID },
        },
    },
}) => ({
    answers,
    questions,
    oldAnswers,
    status,
    pins,
    isFetchingPins,
    fieldErrors,
    companySettings,
    companyID,
    pinOptionVersions,
    histories,
});

export default withRouter(AddPinQuestionRoute);
