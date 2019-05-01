import React from 'react';
import LabelFieldRoute from '../containers/LabelFieldRoute';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LabelField = ({ questionTypes, questionType, handleChange }) => (
    <div className="size-lg-12">
        <Field name="Field type" sizeClasses="size-lg-6">
            <DropdownContainer
                name="questionType"
                options={questionTypes}
                selectedOption={questionType}
                handleChange={handleChange}
            />
        </Field>
        <LabelFieldRoute questionType={!!questionType && questionType.value} />
    </div>
);

export default LabelField;
