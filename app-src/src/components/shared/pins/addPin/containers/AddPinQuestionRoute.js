import React, { Component } from 'react';
import { connect } from 'react-redux';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import RadioButtonListContainer from 'components/shared/generic/form/containers/RadioButtonListContainer';
import SignatureContainer from 'components/shared/generic/form/containers/SignatureContainer';
import MultiDropdownContainer from 'components/shared/generic/form/containers/MultiDropdownContainer';

import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

import { convertArrToObj } from 'helpers/generic';
import Field from 'components/shared/generic/form/presentational/Field';

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
    MULTI_DROPDOWN_OPTIONS
} = QUESTION_TYPE_VALUES;

const SingleLine = ({
    question: { id, isRequired, charLimit },
    answers,
    handleChange
}) => (
    <TextInputContainer
        required={isRequired}
        name={`answer-${id}`}
        value={answers[id]}
        handleChange={handleChange}
        charLimit={charLimit}
    />
);

const MultiLine = ({
    question: { id, isRequired, charLimit },
    answers,
    handleChange
}) => (
    <TextAreaContainer
        required={isRequired}
        name={`answer-${id}`}
        value={answers[id]}
        handleChange={handleChange}
        charLimit={charLimit}
    />
);

const NumberInput = ({
    question: { id, isRequired, maxNum },
    answers,
    handleChange
}) => (
    <TextInputContainer
        required={isRequired}
        type="number"
        name={`answer-${id}`}
        value={answers[id]}
        maxNum={maxNum}
        handleChange={handleChange}
    />
);

const SingleDropdown = ({
    question: { id, isRequired, options },
    answers,
    handleChange
}) => {
    const formattedOpts = options.map(({ id, text }) => ({ value: id, text }));
    const convertedOpts = convertArrToObj(formattedOpts, 'value');
    const answerID = answers[id];

    return (
        <DropdownContainer
            placeholder="-- select --"
            name={`answer-${id}`}
            options={formattedOpts}
            selectedOption={convertedOpts[answerID]}
            handleChange={handleChange}
            required={isRequired}
        />
    );
};

const MultiDropdown = ({
    question: { id, options, isRequired },
    answers,
    handleMultiDropdownChange
}) => {
    const formattedOpts = options.map(({ id, text }) => ({
        value: id,
        label: text
    }));

    return (
        <MultiDropdownContainer
            required={isRequired}
            options={formattedOpts}
            value={answers[id]}
            name={`answer-${id}`}
            handleChange={handleMultiDropdownChange}
        />
    );
};

const CheckBox = ({ question: { id, isRequired }, answers, handleChange }) => (
    <CheckboxContainer
        required={isRequired}
        checked={answers[id] || false}
        name={`answer-${id}`}
        text=""
        handleChange={handleChange}
    />
);

const Radio = ({ question: { id, options }, answers, handleChange }) => (
    <RadioButtonListContainer
        name={`answer-${id}`}
        options={options}
        selectedOption={answers[id]}
        handleChange={handleChange}
    />
);

const SinglePhoto = ({
    question: { isRequired, id },
    answers,
    handleFileChange
}) => (
    <FileUploadContainer
        name={`answer-${id}`}
        required={isRequired}
        acceptedTypes={['image/*']}
        maxFiles={1}
        handleChange={handleFileChange}
        value={answers[id]}
    />
);

const MultiPhoto = ({
    question: { isRequired, maxPhotos, id },
    answers,
    handleFileChange
}) => {
    return (
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

const Signature = ({ question: { isRequired, id }, handleSignatureChange }) => (
    <SignatureContainer
        name={`answer-${id}`}
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        required={isRequired}
        onChange={handleSignatureChange}
    />
);

const Status = () => <div />;

const DropdownOptions = ({
    question: { id, isRequired, options },
    answers,
    handleChange
}) => {
    const formattedOpts = options.map(({ id, text }) => ({ value: id, text }));
    const convertedOpts = convertArrToObj(formattedOpts, 'value');
    const answerID = answers[id];

    return (
        <DropdownContainer
            placeholder="-- select --"
            name={`answer-${id}`}
            options={formattedOpts}
            selectedOption={convertedOpts[answerID]}
            handleChange={handleChange}
            required={isRequired}
        />
    );
};

const MultiDropdownOptions = ({
    question: { id, options, isRequired },
    answers,
    handleMultiDropdownChange
}) => {
    const formattedOpts = options.map(({ id, text }) => ({
        value: id,
        label: text
    }));

    return (
        <MultiDropdownContainer
            required={isRequired}
            options={formattedOpts}
            value={answers[id]}
            name={`answer-${id}`}
            handleChange={handleMultiDropdownChange}
        />
    );
};

class AddPinQuestionRoute extends Component {
    state = {
        sigPad: {}
    };

    render() {
        const { question, answers, questions } = this.props;

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
            [MULTI_DROPDOWN_OPTIONS]: MultiDropdownOptions
        };

        const SpecificField = fieldTypes[question.type + ''] || SingleLine;

        const checkIfShouldShowByPreReq = (
            currentQuestionID,
            prerequisiteQuestionID,
            answers,
            questions
        ) => {
            const preReqQuestion = questions[prerequisiteQuestionID];
            let preReqAnswer = answers[prerequisiteQuestionID];
            const curQuestion = questions[currentQuestionID];

            if (!preReqQuestion) {
                //No Pre Req Question So Show
                return true;
            }

            /*eslint-disable */

            if (preReqQuestion.type == QUESTION_TYPE_VALUES.CHECKBOX) {
                //Convert true to 'true'
                preReqAnswer = preReqAnswer + '';
            }

            if (
                preReqQuestion.type == QUESTION_TYPE_VALUES.DROPDOWN ||
                preReqQuestion.type == QUESTION_TYPE_VALUES.RADIO
            ) {
                //For a drop down we have to convert the GUID to the questin option.
                const selectedOption = preReqQuestion.options.filter(
                    option => option.id == preReqAnswer
                );

                if (selectedOption && selectedOption.length > 0) {
                    preReqAnswer = selectedOption[0].text;
                } else {
                    return false;
                }
            }

            if (preReqQuestion.type == QUESTION_TYPE_VALUES.MULTI_DROPDOWN) {
                const retArray = [];

                if (!preReqAnswer) {
                    return false;
                }

                preReqAnswer.forEach(curAnswer => {
                    const selectedOption = preReqQuestion.options.filter(
                        option => option.id == curAnswer
                    );

                    if (selectedOption && selectedOption.length > 0) {
                        retArray.push(selectedOption[0].text);
                    }
                });

                preReqAnswer = retArray;
            }

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
        };

        const showPreReq = checkIfShouldShowByPreReq(
            question.id,
            question.prerequisiteQuestionID,
            answers,
            questions
        );

        if (showPreReq) {
            return (
                <Field
                    key={question.id}
                    name={question.name}
                    sizeClasses="size-lg-6"
                    required={question.isRequired}
                >
                    <SpecificField
                        question={question}
                        answers={answers}
                        handleChange={this.handleChange}
                        handleFileChange={this.handleFileChange}
                        handleSignatureChange={this.handleSignatureChange}
                        handleMultiDropdownChange={
                            this.handleMultiDropdownChange
                        }
                        sigPad={this.state.sigPad}
                    />
                </Field>
            );
        }

        return <></>;
    }

    componentDidMount() {
        const { resetPinAnswers } = this.props;

        resetPinAnswers();
    }

    handleChange = (_, value) => {
        const { updateAddPinAnswer, question } = this.props;
        updateAddPinAnswer(question.id, value);
    };

    handleMultiDropdownChange = e => {
        const { updateAddPinAnswer, question } = this.props;

        const results = e.map(a => a.value);

        updateAddPinAnswer(question.id, results);
    };

    handleSignatureChange = d => {
        const { updateAddPinAnswer, question } = this.props;
        updateAddPinAnswer(question.id, d);
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
                return [];
            case CHECKBOX:
                return false;
            default:
                return '';
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        addPinFormReducer: { answers },
        templateQuestionsReducer: { questions }
    }
}) => ({
    answers,
    questions
});

const mapDispatchToProps = dispatch => ({
    updateAddPinAnswer: (key, value) => {
        dispatch(updateAddPinAnswer(key, value));
    },
    resetPinAnswers: () => {
        dispatch(resetPinAnswers());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPinQuestionRoute);
