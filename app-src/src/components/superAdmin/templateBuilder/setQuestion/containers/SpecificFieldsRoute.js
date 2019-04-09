import React from 'react';
import { QUESTION_TYPE_VALUES } from 'constants/superAdmin/templateBuilder';

import TextInputForm from '../presentational/TextInputForm';
import NumberInputForm from '../presentational/NumberInputForm';
import MultiOptionForm from '../presentational/MultiOptionForm';
import CheckboxForm from '../presentational/CheckboxForm';
import ImageUploadForm from '../presentational/ImageUploadForm';
import BasicForm from '../presentational/BasicForm';

const {
    SINGLE_LINE,
    MULTI_LINE,
    NUMBER,
    DROPDOWN,
    CHECKBOX,
    PHOTO,
    RADIO,
    SIGNITURE,
    MULTI_SELECT
} = QUESTION_TYPE_VALUES;

const SpecificFieldsRoute = ({ questionType, ...otherProps }) => {
    const questionForms = {
        [SINGLE_LINE]: TextInputForm,
        [MULTI_LINE]: TextInputForm,
        [NUMBER]: NumberInputForm,
        [DROPDOWN]: MultiOptionForm,
        [CHECKBOX]: CheckboxForm,
        [PHOTO]: ImageUploadForm,
        [RADIO]: MultiOptionForm,
        [SIGNITURE]: BasicForm,
        [MULTI_SELECT]: MultiOptionForm
    };

    const SpecificForm = questionForms[questionType] || BasicForm;
    return <SpecificForm {...otherProps} />;
};

export default SpecificFieldsRoute;
