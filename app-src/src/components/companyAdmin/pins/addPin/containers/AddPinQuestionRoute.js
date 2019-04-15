import React, { Component } from 'react';
import { connect } from 'react-redux';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import RadioButtonsContainer from 'components/shared/generic/form/containers/RadioButtonsContainer';

import updateAddPinAnswer from 'actions/companyAdmin/drawings/sync/updateAddPinAnswer';
import resetPinAnswers from 'actions/companyAdmin/drawings/sync/resetPinAnswers';

const {
    SINGLE_LINE,
    MULTI_LINE,
    NUMBER,
    DROPDOWN,
    //MULTI_DROPDOWN,
    RADIO,
    CHECKBOX,
    //SIGNATURE,
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

const NumberInput = ({ question: { isRequired } }) => (
    <TextInputContainer required={isRequired} type="number" />
);

const SingleDropdown = ({ question: { isRequired, options } }) => {
    const formattedOpts = options.map(({ id, text }) => ({ value: id, text }));

    return <DropdownContainer required={isRequired} options={formattedOpts} />;
};

const CheckBox = ({ question: { isRequired } }) => (
    <CheckboxContainer required={isRequired} checked={false} text="" />
);

const Radio = ({ question: { id, isRequired, options } }) =>
    options.map(radio => (
        <RadioButtonsContainer
            key={radio.id}
            name={id}
            value={radio.id}
            text={radio.text}
            checked={false}
            required={isRequired}
        />
    ));

const SinglePhoto = ({ question: { isRequired } }) => (
    <FileUploadContainer
        required={isRequired}
        acceptedTypes={['image/*']}
        maxFiles={1}
    />
);

const MultiPhoto = ({ question: { isRequired, maxPhotos } }) => (
    <FileUploadContainer
        required={isRequired}
        acceptedTypes={['image/*']}
        maxFiles={maxPhotos}
    />
);

class AddPinQuestionRoute extends Component {
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
            [MULTI_PHOTO]: MultiPhoto
        };

        const SpecificField = fieldTypes[question.type + ''] || SingleLine;
        return (
            <SpecificField
                question={question}
                answers={answers}
                handleChange={this.handleChange}
            />
        );
    }

    componentDidMount() {
        const { updateAddPinAnswer, resetPinAnswers, question } = this.props;

        this._getDefaultValue();

        //resetPinAnswers();
        updateAddPinAnswer(question.id, this._getDefaultValue());
    }

    handleChange = ({ target: { type, value, checked } }) => {
        const { updateAddPinAnswer, question } = this.props;
        const val = type === 'checkbox' ? checked : value;

        updateAddPinAnswer(question.id, val);
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
    },
    resetPinAnswers: () => {
        dispatch(resetPinAnswers());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPinQuestionRoute);
