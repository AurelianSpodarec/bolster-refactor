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
    MULTI_MULTI_DROPDOWN_OPTIONS
} = QUESTION_TYPE_VALUES;

const SingleLine = ({
    question: { id, isRequired, charLimit },
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
    question: { id, isRequired, charLimit },
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
    question: { id, isRequired, maxNum },
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
    question: { id, isRequired, options },
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
    question: { id, options, isRequired },
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

const CheckBox = ({ question: { id, isRequired }, answers, handleChange }) => {
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
    question: { id, options, isRequired },
    answers,
    handleChange
}) => {
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
    question: { isRequired, id },
    answers,
    handleFileChange,
    edit
}) => {
    return edit ? (
        <img alt="" src={`${RAW_S3_STORAGE_URL}/${answers[id]}`} />
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
    question: { isRequired, maxPhotos, id },
    answers,
    handleFileChange,
    edit
}) => {
    return edit ? (
        <div>
            {(answers[id] || []).map(src => (
                <img key={src} alt="" src={`${RAW_S3_STORAGE_URL}/${src}`} />
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

const Signature = ({ question: { isRequired, id }, handleSignatureChange }) => {
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
    question: { id, isRequired, optionType },
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
    question: { id, isRequired, optionType },
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
    question: { id, options, isRequired },
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
    question: { id, isRequired, optionType },
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
            resetPinAnswer
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
            [MULTI_MULTI_DROPDOWN_OPTIONS]: MultiMultiDropdownOptions
        };

        const showPreReq = this.checkIfShouldShowByPreReq(
            question.id,
            question.prerequisiteQuestionID,
            answers,
            questions
        );

        if (showPreReq) {
            const SpecificField = fieldTypes[question.type + ''] || SingleLine;

            const extraImageClasses =
                (edit && question.type + '' === MULTI_PHOTO) ||
                question.type + '' === SINGLE_PHOTO
                    ? 'photo-view'
                    : '';

            return (
                <Field
                    key={question.id}
                    name={question.name}
                    sizeClasses={`size-lg-6 flex-row-item ${extraImageClasses}`}
                    required={question.isRequired}
                >
                    <SpecificField
                        statusOptions={selectedVersion.statusOptions}
                        question={question}
                        answers={answers}
                        status={status}
                        dropdownOptions={dropdownOptions}
                        handleChange={this.handleChange}
                        handleStatusChange={this.handleStatusChange}
                        handleFileChange={this.handleFileChange}
                        handleSignatureChange={this.handleSignatureChange}
                        sigPad={this.state.sigPad}
                        edit={edit}
                        resetPinAnswer={resetPinAnswer}
                    />
                </Field>
            );
        }

        return null;
    }

    componentDidMount() {
        const {
            oldAnswers,
            updateAddPinAnswer,
            updateAddPinStatus,
            history,
            resetPinAnswers
        } = this.props;

        if (history.id && oldAnswers) {
            const oldAnswersArray = Object.values(oldAnswers);

            oldAnswersArray.map(answer =>
                updateAddPinAnswer(answer.templateQuestionID, answer.answer)
            );
            updateAddPinStatus(history.status);
        } else {
            resetPinAnswers();
        }
    }
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
            //For a drop down we have to convert the GUID to the questin option.
            const selectedOption = preReqQuestion.options.filter(
                option => option.id === preReqAnswer
            );

            if (selectedOption && selectedOption.length > 0) {
                preReqAnswer = selectedOption[0].text;
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
                const selectedOption = preReqQuestion.options.filter(
                    option => option.id === curAnswer
                );

                if (selectedOption && selectedOption.length > 0) {
                    retArray.push(selectedOption[0].text);
                }
            });

            preReqAnswer = retArray;

            /*eslint-enable */

            if (Array.isArray(preReqAnswer)) {
                //TODO maybe so case in-sensitive check
                if (
                    preReqAnswer.includes(curQuestion.prerequisiteQuestionValue)
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
        }
    };
    // componentWillUnmount = () => {
    //     console.error('HELLO I AM UNMOUNTING');
    //     // remove from reducer when prereq no longer met
    //     const {
    //         resetPinAnswer,
    //         question: { id }
    //     } = this.props;
    //     resetPinAnswer(id);
    // };

    componentDidUpdate = () => {
        const { question, answers, questions, resetPinAnswer } = this.props;
        const prereq = this.checkIfShouldShowByPreReq(
            question.id,
            question.prerequisiteQuestionID,
            answers,
            questions
        );
        if (!prereq && answers[question.id]) resetPinAnswer(question.id);
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

    handleFileChange = (name, s3Key) => {
        const { updateAddPinAnswer, question, answers } = this.props;
        let curAnswer = answers[question.id];

        if (+question.type === +QUESTION_TYPE_VALUES.MULTI_PHOTO) {
            if (!curAnswer) {
                curAnswer = [];
            }

            //Multi File
            var existing = curAnswer.includes(s3Key);

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
            if (answers[question.id] === s3Key) {
                s3Key = '';
            }

            updateAddPinAnswer(question.id, s3Key);
        }
    };

    _getDefaultValue = () => {
        const type = this.props.question.type + '';
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
            pinHistoriesReducer: { histories }
        }
    },
    { match: { params } }
) => {
    return {
        dropdownOptions,
        answers,
        questions,
        oldAnswers,
        status,
        history: histories[params.historyID] || {}
    };
};

const mapDispatchToProps = {
    updateAddPinAnswer,
    resetPinAnswers,
    resetPinAnswer,
    updateAddPinStatus
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddPinQuestionRoute)
);
