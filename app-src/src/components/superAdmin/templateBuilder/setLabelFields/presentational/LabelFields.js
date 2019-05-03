import React from 'react';
import LabelField from './LabelField';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { LABEL_QUES_TYPES } from 'constants/companyAdmin/enums';

const sourceOptions = convertEnumToDropdownOptions(LABEL_QUES_TYPES);

const LabelFields = ({ fields, handleChange, questionOptions }) => (
    <div className="labels-list size-lg-12">
        {fields.map(labelField => (
            <LabelField
                questionOptions={questionOptions}
                key={labelField.uuid}
                labelField={labelField}
                sourceOptions={Object.values(sourceOptions)}
                selectedSource={sourceOptions[labelField.config.source]}
                handleChange={e => handleChange(e, labelField.uuid)}
            />
        ))}
    </div>
);
export default LabelFields;
