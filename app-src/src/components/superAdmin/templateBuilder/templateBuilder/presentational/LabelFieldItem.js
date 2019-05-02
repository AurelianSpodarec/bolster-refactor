import React from 'react';
import { LABEL_QUES_TYPES } from 'constants/shared/templateBuilder';

const LabelFieldItem = ({
    field: {
        config: { title, source }
    }
}) => (
    <div className="label-field-item  size-lg-12">
        <p className="size-lg-3">{LABEL_QUES_TYPES[source] || '{ empty }'}</p>
        <p className="size-lg-3">{title || '{ empty }'}</p>
        <p className="size-lg-3">{source || '{ empty }'}</p>
    </div>
);

export default LabelFieldItem;
