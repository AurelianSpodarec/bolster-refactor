import React from 'react';

import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const AddServiceItem = ({ service, key, handleChange }) => (
    <div key={key} className="subscription-item add-service size-lg-6 size-md-12">
        <div className="field-name size-lg-6 size-md-8">
            <StatusIcon classes="add" iconClass="fa fa-plus" />
            <label>{service.name}</label>
        </div>

        <CheckboxContainer
            classes="small-text"
            checked={service.isChecked}
            name={service.name}
            value={service.id}
            id={`subscription-id-${service.id}`}
            handleChange={handleChange}
            text="Add service"
        />
    </div>
);

export default AddServiceItem;
