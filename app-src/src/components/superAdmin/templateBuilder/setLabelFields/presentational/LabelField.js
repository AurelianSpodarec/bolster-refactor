import React from 'react';
import LabelFieldRoute from '../containers/LabelFieldRoute';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LabelField = ({
    sourceOptions,
    selectedSource,
    handleChange,
    labelField
}) => (
    <div className="size-lg-12">
        <Field name="Field type" sizeClasses="size-lg-6">
            <DropdownContainer
                name="source"
                options={sourceOptions}
                selectedOption={selectedSource}
                handleChange={handleChange}
            />
        </Field>
        <LabelFieldRoute
            source={!!selectedSource && selectedSource.value}
            labelField={labelField}
            handleChange={handleChange}
        />
    </div>
);

export default LabelField;
