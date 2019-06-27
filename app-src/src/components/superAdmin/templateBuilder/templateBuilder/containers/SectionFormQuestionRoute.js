import React, { Component } from 'react';
import { connect } from 'react-redux';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';

// import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
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
import { componentDidMount } from 'helpers/generic';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

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
    // STATUS,
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

// const Status = ({ status, handleStatusChange, statusOptions = [] }) => {
//     const options = Object.entries(PIN_STATUS_TYPES)
//         .filter(([key]) => statusOptions.includes(Number(key)))
//         .map(([value, label]) => ({ value, label }));

//     return (
//         <Select
//             placeholder="-- select --"
//             name="pinStatus"
//             options={options}
//             value={status + ''}
//             onChange={handleStatusChange}
//             required
//         />
//     );
// };
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

class SectionFormQuestionRoute extends Component {

    render() {
        const {
            question,
            dropdownOptions,
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
            [DROPDOWN_OPTIONS]: DropdownOptions,
            [MULTI_DROPDOWN_OPTIONS]: MultiDropdownOptions,
            [MULTI_MULTI_DROPDOWN]: MultiMulti,
            [MULTI_MULTI_DROPDOWN_OPTIONS]: MultiMultiDropdownOptions,
            [STATIC_IMAGE]: StaticImage
        };
        
        const SpecificField = ;
            return (
                <Field
                    key={question.id}
                    name={question.name}
                    sizeClasses={'size-lg-12'}
                    required={question.isRequired}
                >
                    <SpecificField
                        isRequired={question.isRequired}
                        question={question}
                        dropdownOptions={dropdownOptions}
                        handleChange={this.handleChange}
                    />
                </Field>
            );
        

        return null;
    }

    handleChange = () => {};
}

const mapStateToProps = (
    {
        superAdmin: {
            templateQuestionsReducer: { questions },
        }
    }
    
) => ({
    questions
});

const mapDispatchToProps = {
    showModal
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SectionFormQuestionRoute)
);
