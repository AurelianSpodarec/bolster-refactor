import React from 'react';
import LabelField from './LabelField';

const LabelFields = ({ fields, handleChange, sourceOptions }) =>
    fields.map(labelField => (
        <LabelField
            key={labelField.uuid}
            labelField={labelField}
            sourceOptions={Object.values(sourceOptions)}
            selectedSource={sourceOptions[labelField.config.source]}
            handleChange={e => handleChange(e, labelField.uuid)}
        />
    ));

export default LabelFields;
