import React from 'react';
import LabelFieldItem from './LabelFieldItem';

const LabelFieldList = ({ fields }) => (
    <div className="label-field-list">
        <div className="label-field-header size-lg-12">
            <p className="size-lg-3">Source</p>
            <p className="size-lg-3">Title</p>
            <p className="size-lg-2">Question</p>
        </div>

        {fields.map(field => (
            <LabelFieldItem key={field.uuid} field={field} />
        ))}
    </div>
);

export default LabelFieldList;
