import React from 'react';
import { LABEL_TYPES_NUMS } from 'constants/companyAdmin/enums';
import StandardLabelFieldsContainer from './StandardLabelFieldsContainer';
import TrimLabelFieldsContainer from './TrimLabelFieldsConainer';

const LabelFieldsRoute = ({ labelType, ...otherProps }) => {
    const specificFields = {
        [LABEL_TYPES_NUMS.STANDARD]: StandardLabelFieldsContainer,
        [LABEL_TYPES_NUMS.TRIM]: TrimLabelFieldsContainer
    };

    const SpecificComponent = specificFields[labelType];
    if (!SpecificComponent) return null;
    return <SpecificComponent {...otherProps} />;
};

export default LabelFieldsRoute;
