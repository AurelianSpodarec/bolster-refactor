import React from 'react';
import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';

import TextInputForm from '../presentational/TextInputForm';
import NumberInputForm from '../presentational/NumberInputForm';
import MultiOptionFormContainer from './MultiOptionFormContainer';
import MultiPhotoForm from '../presentational/MultiPhotoForm';
import OptionTypeFrom from '../presentational/OptionTypeForm';

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
    DROPDOWN_OPTIONS,
    MULTI_DROPDOWN_OPTIONS,
    MULTI_MULTI_DROPDOWN,
    MULTI_MULTI_DROPDOWN_OPTIONS
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
        [MULTI_PHOTO]: MultiPhotoForm,
        [DROPDOWN_OPTIONS]: OptionTypeFrom,
        [MULTI_DROPDOWN_OPTIONS]: OptionTypeFrom,
        [MULTI_MULTI_DROPDOWN]: MultiOptionFormContainer,
        [MULTI_MULTI_DROPDOWN_OPTIONS]: OptionTypeFrom
    };

    const SpecificForm = questionForms[questionType] || NoFields;
    return <SpecificForm {...otherProps} />;
};

export default SpecificFieldsRoute;
