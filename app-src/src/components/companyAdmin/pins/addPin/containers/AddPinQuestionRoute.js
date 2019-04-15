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

import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';
//import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

import { convertArrToObj } from 'helpers/generic';

const {
    SINGLE_LINE,
    MULTI_LINE,
    NUMBER,
    DROPDOWN,
    //MULTI_DROPDOWN,
    RADIO,
    CHECKBOX,
    SIGNATURE,
    SINGLE_PHOTO,
    MULTI_PHOTO
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
}) => (
    <FileUploadContainer
        name={`answer-${id}`}
        required={isRequired}
        acceptedTypes={['image/*']}
        maxFiles={maxPhotos}
        handleChange={handleFileChange}
        value={answers[id]}
    />
);

const Signature = ({ question: { isRequired, id }, handleSignatureChange}) => (
    <SignatureContainer
        name={`answer-${id}`}
        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
        required={isRequired}
        onChange={handleSignatureChange}
    />
);

class AddPinQuestionRoute extends Component {
    state = {
        sigPad: {}
    };

    render() {
        const { question, answers } = this.props;

        const fieldTypes = {
            [SINGLE_LINE]: SingleLine,
            [MULTI_LINE]: MultiLine,
            [NUMBER]: NumberInput,
            [DROPDOWN]: SingleDropdown,
            [CHECKBOX]: CheckBox,
            [RADIO]: Radio,
            [SINGLE_PHOTO]: SinglePhoto,
            [MULTI_PHOTO]: MultiPhoto,
            [SIGNATURE]: Signature
        };

        const SpecificField = fieldTypes[question.type + ''] || SingleLine;
        return (
            <SpecificField
                question={question}
                answers={answers}
                handleChange={this.handleChange}
                handleFileChange={this.handleFileChange}
                handleSignatureChange={this.handleSignatureChange}
                sigPad={this.state.sigPad}
            />
        );
    }

    componentDidMount() {
        const { updateAddPinAnswer, question } = this.props;

        this._getDefaultValue();

        //resetPinAnswers();
        updateAddPinAnswer(question.id, this._getDefaultValue());
    }

    handleChange = ({ target: { type, value, checked } }) => {
        const { updateAddPinAnswer, question } = this.props;
        const val = type === 'checkbox' ? checked : value;

        updateAddPinAnswer(question.id, val);
    };

    handleSignatureChange = (d) => {
        const { updateAddPinAnswer, question } = this.props;
        updateAddPinAnswer(question.id, d);
    };

    handleFileChange = (name, s3Key) => {
        const { updateAddPinAnswer, question, answers } = this.props;
        const curAnswer = answers[question.id];

        if (Array.isArray(curAnswer)) {
            //Multi File
            var existing = curAnswer.includes(s3Key);

            if (existing) {
                //Delete
                const updated = curAnswer.splice(curAnswer.indexOf(existing));
                updateAddPinAnswer(question.id, updated);
            } else {
                //Add
                curAnswer.push(s3Key);
                updateAddPinAnswer(question.id, curAnswer);
            }
        } else {
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
                return '';
            case MULTI_PHOTO:
                return [];
            case CHECKBOX:
                return false;
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        addPinFormReducer: { answers }
    }
}) => ({
    answers: answers
});

const mapDispatchToProps = dispatch => ({
    updateAddPinAnswer: (key, value) => {
        dispatch(updateAddPinAnswer(key, value));
    }
    // resetPinAnswers: () => {
    //     dispatch(resetPinAnswers());
    // }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPinQuestionRoute);
