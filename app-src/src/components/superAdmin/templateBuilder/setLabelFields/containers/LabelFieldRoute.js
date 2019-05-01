import React from 'react';
import { LABEL_QUES_TYPES_NUMS } from 'constants/companyAdmin/enums';
import StaticLabelFieldContainer from '../containers/StaticLabelFieldContainer';
import DynamicLabelFieldContainer from '../containers/DynamicLabelFieldContainer';

const LabelFieldRoute = ({ questionType, ...otherProps }) => {
    const specificField = {
        [LABEL_QUES_TYPES_NUMS.STATIC]: StaticLabelFieldContainer,
        [LABEL_QUES_TYPES_NUMS.DYNAMIC]: DynamicLabelFieldContainer
    };

    const SpecificComponent = specificField[questionType];
    if (!SpecificComponent) return null;
    return <SpecificComponent {...otherProps} />;
};

export default LabelFieldRoute;
