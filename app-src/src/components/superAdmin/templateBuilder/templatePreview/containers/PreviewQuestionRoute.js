import React from 'react';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import Select from 'components/shared/generic/form/presentational/Select';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import RadioButtonListContainer from 'components/shared/generic/form/containers/RadioButtonListContainer';
import { RAW_S3_STORAGE_URL } from 'config';
import Field from 'components/shared/generic/form/presentational/Field';
import MobileSwitch from '_content/images/mobile-switch.png';

const {
    STATUS,
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
    DROPDOWN_OPTIONS,
    MULTI_DROPDOWN_OPTIONS,
    MULTI_MULTI_DROPDOWN,
    MULTI_MULTI_DROPDOWN_OPTIONS,
    STATIC_IMAGE,
    DOCUMENT_UPLOAD
} = QUESTION_TYPE_VALUES;

const PreviewQuestionRoute = ({ question }) => {
    const questionForms = {
        [STATUS]: SingleDropdown,
        [SINGLE_LINE]: SingleLine,
        [MULTI_LINE]: MultiLine,
        [NUMBER]: SingleLine,
        [DROPDOWN]: SingleDropdown,
        [MULTI_DROPDOWN]: MultiDropdown,
        [RADIO]: Radio,
        [CHECKBOX]: CheckBox,
        [SIGNATURE]: MultiLine,
        [SINGLE_PHOTO]: Photo,
        [MULTI_PHOTO]: Photo,
        [DROPDOWN_OPTIONS]: SingleDropdown,
        [MULTI_DROPDOWN_OPTIONS]: MultiDropdown,
        [MULTI_MULTI_DROPDOWN]: MultiMultiDropdown,
        [MULTI_MULTI_DROPDOWN_OPTIONS]: MultiMultiDropdown,
        [STATIC_IMAGE]: StaticImage,
        [DOCUMENT_UPLOAD]: DocumentUpload,

    };

    const Nothing = () => null;
    const SpecificForm = questionForms[question.questionType] || Nothing;
    return (
        <Field name={question.name}>
            <SpecificForm question={question} handleChange={Nothing} />
        </Field>
    );
};

export default PreviewQuestionRoute;

function SingleLine({ question: { id }, handleChange }) {
    return (
        <TextInputContainer
            name={`answer-${id}`}
            value=""
            handleChange={handleChange}
            disabled
        />
    );
}

function MultiLine({ question: { id }, handleChange }) {
    return (
        <TextAreaContainer
            name={`answer-${id}`}
            value=""
            handleChange={handleChange}
            disabled
        />
    );
}

function SingleDropdown({ question: { id, options }, handleChange }) {
    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={options}
            value={null}
            onChange={handleChange}
            disabled
            iconClass="fas fa-caret-down"
        />
    );
}

function MultiDropdown({ question, handleChange }) {
    return (
        <MultiSelect
            placeholder="-- select --"
            options={question.options}
            value={[]}
            name={`answer-${question.id}`}
            onChange={handleChange}
            iconClass="fas fa-caret-down"
        />
    );
}

function MultiMultiDropdown() {
    return (
        <div className="phone-multt-multi size-lg-12">
            <p>Options:</p>

            <div className="option">Option 1</div>
            <div className="option">Option 2</div>
            <div className="option">Option 3</div>
        </div>
    );
}
function CheckBox() {
    return <img src={MobileSwitch} alt="switch" className="switch" />;
}

function Radio({ question: { id, options }, handleChange }) {
    return (
        <RadioButtonListContainer
            name={`answer-${id}`}
            options={options}
            selectedOption={null}
            handleChange={handleChange}
        />
    );
}

function Photo() {
    return <button className="button">Take Photo</button>;
}

function DocumentUpload() {
    return <button className="button">Upload Document</button>;
}
function StaticImage({ question }) {
    return (
        <img
            style={{ maxWidth: '100%' }}
            alt={question.name}
            src={`${RAW_S3_STORAGE_URL}/${question.file}`}
        />
    );
}
