import React from 'react';
import { LABEL_QUES_TYPES_NUMS } from 'constants/companyAdmin/enums';
// import DynamicLabelFieldContainer from '../containers/DynamicLabelFieldContainer';
import StaticLabelField from '../presentational/StaticLabelField';

const LabelFieldRoute = ({ source, labelField, ...otherProps }) => {
    const specificField = {
        [LABEL_QUES_TYPES_NUMS.STATIC]: StaticLabelField,
        [LABEL_QUES_TYPES_NUMS.DYNAMIC]: StaticLabelField
    };

    const SpecificComponent = specificField[source];
    if (!SpecificComponent) return null;
    return <SpecificComponent {...otherProps} labelField={labelField} />;
};

export default LabelFieldRoute;
