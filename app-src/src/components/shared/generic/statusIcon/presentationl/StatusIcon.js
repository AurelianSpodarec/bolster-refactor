import React from 'react';

const StatusIcon = ({
    statusType = 'green',
    classes = '',
    iconClass = 'fa fa-check'
}) => (
    <div className={`status-icon ${classes} ${statusType}`}>
        <i className={iconClass} />
    </div>
);

export default StatusIcon;
