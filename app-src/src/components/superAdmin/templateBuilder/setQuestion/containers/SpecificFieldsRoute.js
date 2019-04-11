import React from 'react';
import { QUESTION_TYPE_VALUES } from 'constants/superAdmin/templateBuilder';

import TextInputForm from '../presentational/TextInputForm';
import NumberInputForm from '../presentational/NumberInputForm';
import MultiOptionFormContainer from './MultiOptionFormContainer';
import MultiPhotoForm from '../presentational/MultiPhotoForm';

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

const NoFields = () => null;
const SpecificFieldsRoute = ({ questionType, ...otherProps }) => {
    const questionForms = {
        [SINGLE_LINE]: TextInputForm,
        [MULTI_LINE]: TextInputForm,
        [NUMBER]: NumberInputForm,
        [DROPDOWN]: MultiOptionFormContainer,
        [MULTI_DROPDOWN]: MultiOptionFormContainer,
        [RADIO]: MultiOptionFormContainer,
        [CHECKBOX]: NoFields,
        [SIGNATURE]: NoFields,
        [SINGLE_PHOTO]: NoFields,
        [MULTI_PHOTO]: MultiPhotoForm
    };

    const SpecificForm = questionForms[questionType] || NoFields;
    return <SpecificForm {...otherProps} />;
};

export default SpecificFieldsRoute;
