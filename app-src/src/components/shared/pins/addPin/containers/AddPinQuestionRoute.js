import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';

import updateAddPinStatus from 'actions/companyAdmin/drawings/sync/updateAddPinStatus';
import { useParams } from 'react-router-dom';

import Field from 'components/shared/generic/form/presentational/Field';
import resetPinAnswer from 'actions/companyAdmin/drawings/sync/resetPinAnswer';
import { componentDidMount, convertArrToObj, deepEquals, isEmpty } from 'helpers/generic';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import { fieldTypes, getDefaultValue } from '../fieldTypes/allFieldTypes';
import { QUESTION_TYPE_NUMBERS, QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import { getValueForQuestionAnswer } from '../fieldTypes/helpers';
import { usePrevious } from '../../../../../helpers/hooks';
import { selectAddPinQuestionMeasurements } from '../../../../../selectors/companyAdmin/addPin';
import updateAddPinMeasurement from '../../../../../actions/companyAdmin/drawings/sync/updateAddPinMeasurement';
import { selectDrawing } from '../../../../../selectors/companyAdmin/drawings';
import { selectIsCostingEnabled } from '../../../../../selectors/companyAdmin/companySettings';

const {
    SINGLE_LINE,
    MULTI_LINE,
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
    CHECKBOX,
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
    drawingID,
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
    const drawing = useSelector(state => selectDrawing(state, drawingID));
    const measurements = useSelector(state => selectAddPinQuestionMeasurements(state, question.id));
    const isCostingEnabled = useSelector(selectIsCostingEnabled);

    const params = useParams();
    const { historyID } = params;
    const history = histories[historyID] || {};
    const dispatch = useDispatch();
    const [originalPinOptionAnswers, setOriginalPinOptionAnswers] = React.useState({});
    componentDidMount(() => handlePrefillOrReset());

    const answer = answers[question.id];
    const answerName = `answer-${question.id}`;
    const showPreReq = useMemo(checkIfShouldShowByPreReq, [
        question,
        answers,
        questions,
        status,
        pinOptionVersions,
    ]);

    const prevProps = usePrevious({ status, question, template, isFetchingPins });
    // handle reset answer when not showing from prerequisites
    useEffect(() => {
        if (!showPreReq && !isEmpty(answer) && !deepEquals(answer, getDefaultValue(question))) {
            dispatch(resetPinAnswer(question.id, getDefaultValue(question)));
        }
    }, [status, question, template, isFetchingPins, answer, showPreReq]);
    // handle reset answer when status changes
    useEffect(() => {
        const hasStatusChanged = prevProps.status !== status;
        if (`${question.type}` !== STATUS && hasStatusChanged) {
            // * handle isRequiredBasedOnStatus
            const isRequiredButEmpty = _getIsRequired() && isEmpty(answer);

            if (isRequiredButEmpty && showPreReq) {
                dispatch(addFieldError(answerName, 'This is a required field.'));
            } else {
                dispatch(removeFieldError(answerName));
            }
            // * handle prefillFromStatus

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
                const { templateQuestionID, answerValues, measurements } = oldAnswer;
                const values = answerValues?.map(val => ({ ...val, uid: val.id }));
                dispatch(updateAddPinAnswer(templateQuestionID, values));
                if (
                    question.type + '' === PIN_OPTION_TYPES ||
                    question.type + '' === MULTI_PIN_OPTION_TYPES ||
                    question.type + '' === MULTI_MULTI_PIN_OPTION_TYPES
                ) {
                    setOriginalPinOptionAnswers(answerValues);
                }
                if (measurements) {
                    const formattedMeasurements = formatOldMeasurements(measurements);
                    dispatch(updateAddPinMeasurement(templateQuestionID, formattedMeasurements));
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
        // todo prefill measurements if add history / edit
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
                    handleMeasurementChange={handleMeasurementChange}
                    edit={edit}
                    resetPinAnswer={(id, val) => dispatch(resetPinAnswer(id, val))}
                    isHistory={isHistory}
                    originalPinOptionAns={originalPinOptionAnswers}
                    defaultDropdownSorting={companySettings.defaultDropdownSorting}
                    companyID={companyID}
                    pinOptions={pinOptions}
                    measurements={measurements}
                    drawing={drawing}
                    isCostingEnabled={isCostingEnabled}
                />
            </Field>
        );
    }

    return null;

    function _getIsRequired() {
        const { isRequired, isRequiredVal, type } = question;

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

            if (
                [DROPDOWN, MULTI_DROPDOWN, RADIO, SINGLE_LINE, MULTI_LINE, RADIO].includes(
                    preReqType,
                )
            ) {
                preReqAnswers = preReqAnswers?.map(ans => ans.textValue);
            }
            if (preReqType === CHECKBOX) {
                preReqAnswers = preReqAnswers?.map(ans => ans.booleanValue);
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
            const oldAnswer = pinAnswersByGroupKey[question.groupKey];
            // add uid so can be matched with prefilled measumrents
            const oldAnswerValues = oldAnswer.answerValues?.map(ans => ({ ...ans, uid: ans.id }));
            dispatch(updateAddPinAnswer(question.id, oldAnswerValues));
            const oldMeasurements = oldAnswer.measurements;
            if (oldMeasurements) {
                const formattedMeasurements = formatOldMeasurements(oldMeasurements);
                dispatch(updateAddPinMeasurement(question.id, formattedMeasurements));
            }
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
        if (measurements[question.id]) {
            dispatch(updateAddPinMeasurement(question.id, null));
        }
    }

    function handleStatusPrefill() {
        if (!latestPinHistory) return;
        if (selectedVersion.statusOptions.includes(latestPinHistory.status)) {
            handleStatusChange(null, latestPinHistory.status);
        }
    }
    function handleChange(_, value) {
        const valueToStore = getValueForQuestionAnswer(question, value, answer);
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

    function handleMeasurementChange(uid, key, value) {
        const updatedMeasurements = {
            ...measurements,
            // on change, set id to null so it will be re-created (only applies to edit)
            [uid]: { ...measurements[uid], [key]: value, id: null },
        };
        dispatch(updateAddPinMeasurement(question.id, updatedMeasurements));
    }

    function formatOldMeasurements(measurements) {
        const measurementsWithUid = measurements.map(m => ({
            ...m,
            uid: m.pinHistoryAnswerValueID,
            id: edit ? m.id : null,
        }));
        return convertArrToObj(measurementsWithUid, 'uid');
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

export default AddPinQuestionRoute;
