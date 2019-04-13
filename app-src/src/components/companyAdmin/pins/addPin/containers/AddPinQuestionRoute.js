import React from 'react';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import RadioButtonsContainer from 'components/shared/generic/form/containers/RadioButtonsContainer';

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
    MULTI_PHOTO
} = QUESTION_TYPE_VALUES;

const SingleLine = ({ question: { isRequired } }) => (
    <TextInputContainer required={isRequired} />
);

const MultiLine = ({ question: { isRequired } }) => (
    <TextAreaContainer required={isRequired} />
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

const AddPinQuestionRoute = ({ question }) => {
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
    return <SpecificField question={question} />;
};

export default AddPinQuestionRoute;
