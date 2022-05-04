import React from 'react';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';

const SubscribedServiceListItem = ({ serviceName }) => (
    <div className="subscription-item size-lg-6 size-md-12">
        <div className="field-name size-lg-12">
            <label>{serviceName}</label>
            <StatusIcon />
        </div>
    </div>
);

export default SubscribedServiceListItem;
