import React from 'react';
import LabelFieldRoute from '../containers/LabelFieldRoute';
import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';

const LabelField = ({
    questionOptions,
    sourceOptions,
    selectedSource,
    handleChange,
    labelField
}) => (
    <div className="label-field size-lg-12">
        <div className="size-lg-12">
            <Field name="Field type" sizeClasses="size-lg-12">
                <Select
                    placeholder="Empty"
                    name="source"
                    options={sourceOptions}
                    value={selectedSource}
                    onChange={handleChange}
                />
            </Field>
        </div>
        <LabelFieldRoute
            questionOptions={questionOptions}
            source={!!selectedSource && selectedSource}
            labelField={labelField}
            handleChange={handleChange}
        />
    </div>
);

export default LabelField;
