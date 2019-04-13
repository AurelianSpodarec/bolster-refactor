import React from 'react';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import SwitchContainer from 'components/shared/generic/form/containers/SwitchContainer';

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
    <SwitchContainer checked={false} text="" />
);

const AddPinQuestionRoute = ({ question }) => {
    const fieldTypes = {
        [SINGLE_LINE]: SingleLine,
        [MULTI_LINE]: MultiLine,
        [NUMBER]: NumberInput,
        [DROPDOWN]: SingleDropdown,
        [CHECKBOX]: CheckBox
    };
    const SpecificField = fieldTypes[question.type + ''] || SingleLine;
    return <SpecificField question={question} />;
};

export default AddPinQuestionRoute;
