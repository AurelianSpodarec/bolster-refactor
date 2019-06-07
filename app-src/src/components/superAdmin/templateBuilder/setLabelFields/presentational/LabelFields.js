import React from 'react';
import LabelField from './LabelField';
import { LABEL_QUES_TYPES } from 'constants/companyAdmin/enums';

const sourceOptions = Object.entries(LABEL_QUES_TYPES).map(
    ([value, label]) => ({ value: +value, label })
);

const LabelFields = ({ fields, handleChange, questionOptions }) => (
    <div className="labels-list size-lg-12">
        {fields.map(labelField => (
            <LabelField
                questionOptions={questionOptions}
                key={labelField.uuid}
                labelField={labelField}
                sourceOptions={Object.values(sourceOptions)}
                selectedSource={labelField.config.source}
                handleChange={(name, value) =>
                    handleChange(name, value, labelField.uuid)
                }
            />
        ))}
    </div>
);
export default LabelFields;
