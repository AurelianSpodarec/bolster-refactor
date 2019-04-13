import React from 'react';

import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';

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

const NumberInput = ({ isRequired }) => (
    <TextInputContainer required={isRequired} type="number" />
);

const AddPinQuestionRoute = ({ question }) => {
    const fieldTypes = {
        [SINGLE_LINE]: SingleLine,
        [MULTI_LINE]: MultiLine,
        [NUMBER]: NumberInput
    };
    const SpecificField = fieldTypes[question.type + ''] || SingleLine;
    return <SpecificField question={question} />;
};

export default AddPinQuestionRoute;
