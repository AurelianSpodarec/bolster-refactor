import React from 'react';

import { ADD_SERVICE_TO_SUBSCRIPTION } from 'constants/shared/modalTypes';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';

const AddServiceItem = ({ service, key, showModal }) => (
    <div key={key} className="subscription-item add-service size-lg-6">
        <div className="field-name size-lg-6">
            <StatusIcon classes="add" iconClass="fa fa-plus" />
            <label>{service.name}</label>
        </div>

        <button
            className="button green"
            onClick={e => {
                e.preventDefault();
                showModal(ADD_SERVICE_TO_SUBSCRIPTION, {
                    service
                });
            }}
        >
            Add
        </button>
    </div>
);

export default AddServiceItem;
