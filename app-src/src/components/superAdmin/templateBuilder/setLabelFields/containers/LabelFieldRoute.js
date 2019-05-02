import React from 'react';
import { LABEL_QUES_TYPES_NUMS } from 'constants/companyAdmin/enums';

import Field from 'components/shared/generic/form/presentational/Field';
import StaticLabelField from '../presentational/StaticLabelField';
import DynamicLabelField from '../presentational/DynamicLabelField';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const LabelFieldRoute = ({
    source,
    labelField,
    handleChange,
    ...otherProps
}) => {
    const specificField = {
        [LABEL_QUES_TYPES_NUMS.STATIC]: StaticLabelField,
        [LABEL_QUES_TYPES_NUMS.DYNAMIC]: DynamicLabelField
    };

    const SpecificComponent = specificField[source];
    if (!SpecificComponent) return null;
    return (
        <>
            <Field name="Title" sizeClasses="size-lg-6">
                <TextInputContainer
                    name="title"
                    value={labelField.config.title}
                    handleChange={handleChange}
                />
            </Field>
            <SpecificComponent
                {...otherProps}
                handleChange={handleChange}
                labelField={labelField}
            />
        </>
    );
};

export default LabelFieldRoute;
