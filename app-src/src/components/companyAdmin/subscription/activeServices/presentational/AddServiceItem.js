import React from 'react';

import { ADD_MULTIPLE_SERVICES_TO_SUBSCRIPTION } from 'constants/shared/modalTypes';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const AddServiceItem = ({ service, showModal, canEdit }) => {
    if (canEdit)
        return (
            <div className="subscription-item add-service size-lg-6 size-md-12">
                <div className="field-name size-lg-12 flex-row justify-space-between">
                    <StatusIcon classes="add" iconClass="fa fa-plus" />
                    <label style={{ flex: 1 }}>{service.name}</label>
                    <ButtonWrapper alignment="right" inline>
                        <ActionButton
                            onClick={e => {
                                e.preventDefault();
                                showModal(ADD_MULTIPLE_SERVICES_TO_SUBSCRIPTION, {
                                    serviceID: service.id,
                                });
                            }}
                            text="Add"
                            size="small"
                            ambient="positive"
                        />
                    </ButtonWrapper>
                </div>
            </div>
        );

    return (
        <div className="subscription-item add-service size-lg-6 size-md-12">
            <div className="field-name size-lg-12 flex-row justify-space-between">
                <StatusIcon classes="add" iconClass="fa fa-plus" />
                <label style={{ flex: 1 }}>{service.name}</label>
                <TooltipContainer
                    side="top"
                    text="You can add new services when your new subsciption begins."
                >
                    <ButtonWrapper alignment="right" inline>
                        <ActionButton
                            onClick={e => {
                                e.preventDefault();
                            }}
                            text="Add"
                            size="small"
                            ambient="positive"
                            disabled
                            extraClasses=""
                        />
                    </ButtonWrapper>
                </TooltipContainer>
            </div>
        </div>
    );
};

export default AddServiceItem;
