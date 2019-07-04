import React, { Component } from 'react';
import { connect } from 'react-redux';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import updateAddPinStatus from 'actions/companyAdmin/drawings/sync/updateAddPinStatus';
import { withRouter } from 'react-router-dom';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import RadioButtonListContainer from 'components/shared/generic/form/containers/RadioButtonListContainer';
import SignatureContainer from 'components/shared/generic/form/containers/SignatureContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BoundlessSelect from 'components/shared/generic/form/presentational/BoundlessSelect';
import NumberInputContainer from 'components/shared/generic/form/containers/NumberInputContainer';
import Select from 'components/shared/generic/form/presentational/Select';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { RAW_S3_STORAGE_URL } from 'config';
import resetPinAnswer from 'actions/companyAdmin/drawings/sync/resetPinAnswer';
import { componentDidMount, isEmpty } from 'helpers/generic';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PIN_IMAGE } from 'constants/shared/modalTypes';

const {
    SINGLE_LINE,
    MULTI_LINE,
    NUMBER,
    DROPDOWN,
    MULTI_DROPDOWN,
    RADIO,
    CHECKBOX,
    SIGNATURE,
    SINGLE_PHOTO,
    MULTI_PHOTO,
    STATUS,
    DROPDOWN_OPTIONS,
    MULTI_DROPDOWN_OPTIONS,
    MULTI_MULTI_DROPDOWN,
    MULTI_MULTI_DROPDOWN_OPTIONS,
    STATIC_IMAGE
} = QUESTION_TYPE_VALUES;

const SingleLine = ({
    isRequired,
    question: { id, charLimit },
    answers,
    handleChange
}) => {
    return (
        <TextInputContainer
            required={isRequired}
            name={`answer-${id}`}
            value={answers[id]}
            handleChange={handleChange}
            charLimit={charLimit}
        />
    );
};

const MultiLine = ({
    isRequired,
    question: { id, charLimit },
    answers,
    handleChange
}) => {
    return (
        <TextAreaContainer
            required={isRequired}
            name={`answer-${id}`}
            value={answers[id]}
            handleChange={handleChange}
            charLimit={charLimit}
        />
    );
};
const NumberInput = ({
    isRequired,
    question: { id, maxNum },
    answers,
    handleChange
}) => {
    return (
        <NumberInputContainer
            required={isRequired}
            name={`answer-${id}`}
            value={answers[id]}
            maxNum={maxNum}
            handleChange={handleChange}
        />
    );
};

const SingleDropdown = ({
    isRequired,
    question: { id, options },
    answers,
    handleChange
}) => {
    const opts = options.map(({ id, text }) => ({ value: id, label: text }));

    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={opts}
            value={answers[id]}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

const MultiDropdown = ({
    isRequired,
    question: { id, options },
    answers,
    handleChange
}) => {
    const opts = options.map(({ id, text }) => ({ value: id, label: text }));

    return (
        <MultiSelect
            placeholder="-- select --"
            options={opts}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

const CheckBox = ({ isRequired, question: { id }, answers, handleChange }) => {
    return (
        <CheckboxContainer
            required={isRequired}
            checked={answers[id] || false}
            name={`answer-${id}`}
            text=""
            handleChange={handleChange}
        />
    );
};

const Radio = ({
    isRequired,
    question: { id, options, defaultValue },
    answers,
    handleChange,
    edit
}) => {
    componentDidMount(() => {
        if (!answers[id] && !edit && defaultValue) {
            handleChange(null, defaultValue);
        }
    });

    return (
        <RadioButtonListContainer
            name={`answer-${id}`}
            options={options}
            selectedOption={answers[id]}
            handleChange={handleChange}
            required={isRequired}
        />
    );
};

const SinglePhoto = ({
    isRequired,
    question: { id },
    answers,
    handleFileChange,
    handleImageClick,
    edit
}) => {
    return edit ? (
        <img
            alt=""
            src={`${RAW_S3_STORAGE_URL}/${answers[id]}`}
            onClick={() =>
                handleImageClick({
                    image: `${RAW_S3_STORAGE_URL}/${answers[id]}`
                })
            }
        />
    ) : (
        <FileUploadContainer
            name={`answer-${id}`}
            required={isRequired}
            acceptedTypes={['image/*']}
            maxFiles={1}
            handleChange={handleFileChange}
            value={answers[id]}
        />
    );
};

const MultiPhoto = ({
    isRequired,
    question: { maxPhotos, id },
    answers,
    handleFileChange,
    handleImageClick,
    edit
}) => {
    return edit ? (
        <div>
            {(answers[id] || []).map(src => (
                <img
                    key={src}
                    alt=""
                    src={`${RAW_S3_STORAGE_URL}/${src}`}
                    onClick={() =>
                        handleImageClick({
                            image: `${RAW_S3_STORAGE_URL}/${src}`
                        })
                    }
                />
            ))}
        </div>
    ) : (
        <FileUploadContainer
            name={`answer-${id}`}
            required={isRequired}
            acceptedTypes={['image/*']}
            maxFiles={maxPhotos ? maxPhotos : 25}
            handleChange={handleFileChange}
            value={answers[id]}
        />
    );
};

const Signature = ({ isRequired, question: { id }, handleSignatureChange }) => {
    return (
        <SignatureContainer
            name={`answer-${id}`}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
            required={isRequired}
            onChange={handleSignatureChange}
        />
    );
};

const Status = ({ status, handleStatusChange, statusOptions = [] }) => {
    const options = Object.entries(PIN_STATUS_TYPES)
        .filter(([key]) => statusOptions.includes(Number(key)))
        .map(([value, label]) => ({ value, label }));

    return (
        <Select
            placeholder="-- select --"
            name="pinStatus"
            options={options}
            value={status + ''}
            onChange={handleStatusChange}
            required
        />
    );
};
const DropdownOptions = ({
    isRequired,
    question: { id, optionType },
    dropdownOptions,
    answers,
    handleChange
}) => {
    const formattedOpts = dropdownOptions
        .filter(option => option.type + '' === optionType + '')
        .map(({ name }) => ({ value: name, label: name }));

    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={formattedOpts}
            value={answers[id]}
            onChange={handleChange}
            required={isRequired}
        />
    );
};

const MultiDropdownOptions = ({
    isRequired,
    question: { id, optionType },
    dropdownOptions,
    answers,
    handleChange
}) => {
    const opts = dropdownOptions
        .filter(option => option.type + '' === optionType + '')
        .map(({ name }) => ({ value: name, label: name }));

    return (
        <MultiSelect
            required={isRequired}
            options={opts}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
        />
    );
};

const MultiMulti = ({
    isRequired,
    question: { id, options },
    answers,
    handleChange
}) => {
    const formattedOpts = options.map(({ id, text }) => ({
        value: id,
        label: text
    }));

    return (
        <BoundlessSelect
            required={isRequired}
            options={formattedOpts}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
            search
        />
    );
};

const MultiMultiDropdownOptions = ({
    isRequired,
    question: { id, optionType },
    dropdownOptions,
    answers,
    handleChange
}) => {
    const formattedOpts = dropdownOptions
        .filter(option => option.type + '' === optionType + '')
        .map(({ name }) => ({
            value: name,
            label: name
        }));

    return (
        <BoundlessSelect
            required={isRequired}
            options={formattedOpts}
            value={answers[id]}
            name={`answer-${id}`}
            onChange={handleChange}
            search
        />
    );
};

const StaticImage = ({ question }) => (
    <img
        style={{ maxWidth: '100%' }}
        alt={question.name}
        src={`${RAW_S3_STORAGE_URL}/${question.file}`}
    />
);

class AddPinQuestionRoute extends Component {
    state = {
        sigPad: {}
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

        const fieldTypes = {
            [SINGLE_LINE]: SingleLine,
            [MULTI_LINE]: MultiLine,
            [NUMBER]: NumberInput,
            [DROPDOWN]: SingleDropdown,
            [MULTI_DROPDOWN]: MultiDropdown,
            [CHECKBOX]: CheckBox,
            [RADIO]: Radio,
            [SINGLE_PHOTO]: SinglePhoto,
            [MULTI_PHOTO]: MultiPhoto,
            [SIGNATURE]: Signature,
            [STATUS]: Status,
            [DROPDOWN_OPTIONS]: DropdownOptions,
            [MULTI_DROPDOWN_OPTIONS]: MultiDropdownOptions,
            [MULTI_MULTI_DROPDOWN]: MultiMulti,
            [MULTI_MULTI_DROPDOWN_OPTIONS]: MultiMultiDropdownOptions,
            [STATIC_IMAGE]: StaticImage
        };

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
            const SpecificField = fieldTypes[question.type + ''] || SingleLine;

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
                    />
                </Field>
            );
        }

        return null;
    }

    componentDidMount() {
        // const { resetPinAnswers } = this.props;
        // resetPinAnswers();
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
            //No Pre Req Question So Show
            return true;
        }

        if (String(preReqQuestion.type) === STATUS) {
            return (
                String(question.prerequisiteQuestionValue) === String(status)
            );
        }

        if (String(preReqQuestion.type) === QUESTION_TYPE_VALUES.CHECKBOX) {
            //Convert true to 'true'
            preReqAnswer = String(preReqAnswer);
        }

        if (
            String(preReqQuestion.type) === QUESTION_TYPE_VALUES.DROPDOWN ||
            String(preReqQuestion.type) === QUESTION_TYPE_VALUES.RADIO
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
            String(preReqQuestion.type) === QUESTION_TYPE_VALUES.MULTI_DROPDOWN
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
                String(answer).toLowerCase()
            );
            if (
                lowerCaseAnswers.includes(
                    String(curQuestion.prerequisiteQuestionValue).toLowerCase()
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
            edit
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

        if (isDoneFetchingPins && (history.id && oldAnswers && edit)) {
            const oldAnswersArray = Object.values(oldAnswers);
            const oldAnswer = oldAnswersArray.find(
                ({ templateQuestionID }) => templateQuestionID === question.id
            );
            if (oldAnswer) {
                const { templateQuestionID, answer } = oldAnswer;
                updateAddPinAnswer(templateQuestionID, answer);
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

    _getDefaultValue = () => {
        const type = String(this.props.question.type);
        switch (type) {
            case SINGLE_LINE:
            case MULTI_LINE:
            case NUMBER:
            case DROPDOWN:
            case RADIO:
            case SINGLE_PHOTO:
            case DROPDOWN_OPTIONS:
                return '';
            case MULTI_PHOTO:
            case MULTI_DROPDOWN:
            case MULTI_DROPDOWN_OPTIONS:
            case MULTI_MULTI_DROPDOWN:
            case MULTI_MULTI_DROPDOWN_OPTIONS:
                return [];
            case CHECKBOX:
                return false;
            default:
                return '';
        }
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
    fieldErrors
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
