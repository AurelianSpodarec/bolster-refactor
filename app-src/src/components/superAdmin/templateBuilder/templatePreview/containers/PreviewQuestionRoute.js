import React from 'react';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import Select from 'components/shared/generic/form/presentational/Select';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import RadioButtonListContainer from 'components/shared/generic/form/containers/RadioButtonListContainer';
import { RAW_S3_STORAGE_URL } from 'config';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';

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
    STATIC_IMAGE
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
        [SIGNATURE]: () => null,
        [SINGLE_PHOTO]: Photo,
        [MULTI_PHOTO]: Photo,
        [DROPDOWN_OPTIONS]: SingleDropdown,
        [MULTI_DROPDOWN_OPTIONS]: MultiDropdown,
        [MULTI_MULTI_DROPDOWN]: MultiDropdown,
        [MULTI_MULTI_DROPDOWN_OPTIONS]: MultiDropdown,
        [STATIC_IMAGE]: StaticImage
    };

    const Nothing = () => null;
    const SpecificForm = questionForms[question.questionType] || Nothing;
    return <SpecificForm question={question} handleChange={Nothing} />;
};

export default PreviewQuestionRoute;

function SingleLine({ question: { id }, handleChange }) {
    return (
        <TextInputContainer
            name={`answer-${id}`}
            value=""
            handleChange={handleChange}
        />
    );
}

function MultiLine({ question: { id }, handleChange }) {
    return (
        <TextAreaContainer
            name={`answer-${id}`}
            value=""
            handleChange={handleChange}
        />
    );
}

function SingleDropdown({ question: { id }, handleChange }) {
    const opts = [];

    return (
        <Select
            placeholder="-- select --"
            name={`answer-${id}`}
            options={opts}
            value={null}
            onChange={handleChange}
        />
    );
}

function MultiDropdown({ question: { id }, handleChange }) {
    const opts = [];

    return (
        <MultiSelect
            placeholder="-- select --"
            options={opts}
            value={[]}
            name={`answer-${id}`}
            onChange={handleChange}
        />
    );
}

function CheckBox({ question: { id }, handleChange }) {
    return (
        <CheckboxContainer
            checked={false}
            name={`answer-${id}`}
            text=""
            handleChange={handleChange}
        />
    );
}

function Radio({ question: { id }, handleChange }) {
    return (
        <RadioButtonListContainer
            name={`answer-${id}`}
            options={[]}
            selectedOption={null}
            handleChange={handleChange}
        />
    );
}

function Photo({ isRequired, question: { id }, handleChange }) {
    return (
        <FileUploadContainer
            name={`answer-${id}`}
            required={isRequired}
            acceptedTypes={[]}
            handleChange={handleChange}
            value={[]}
        />
    );
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
