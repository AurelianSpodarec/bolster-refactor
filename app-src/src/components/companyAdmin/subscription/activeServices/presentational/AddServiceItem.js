import React from 'react';

import { ADD_MULTIPLE_SERVICES_TO_SUBSCRIPTION } from 'constants/shared/modalTypes';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const AddServiceItem = ({ service, key, showModal, canEdit }) => {
    if (canEdit)
        return (
            <div key={key} className="subscription-item add-service size-lg-6 size-md-12">
                <div className="field-name size-lg-6 size-md-8">
                    <StatusIcon classes="add" iconClass="fa fa-plus" />
                    <label>{service.name}</label>
                </div>

                <button
                    className="button green"
                    onClick={e => {
                        e.preventDefault();
                        showModal(ADD_MULTIPLE_SERVICES_TO_SUBSCRIPTION, { serviceID: service.id });
                    }}
                >
                    Add
                </button>
            </div>
        );

    return (
        <div key={key} className="subscription-item add-service size-lg-6 size-md-12">
            <div className="field-name size-lg-6 size-md-8">
                <StatusIcon classes="add" iconClass="fa fa-plus" />
                <label>{service.name}</label>
            </div>
            <TooltipContainer
                side="top"
                text="You can add new services when your new subsciption begins."
            >
                <button
                    type="button"
                    style={{ opacity: 0.5, cursor: 'default' }}
                    className="button green"
                    onClick={e => {
                        e.preventDefault();
                    }}
                >
                    Add
                </button>
            </TooltipContainer>
        </div>
    );
};

export default AddServiceItem;
