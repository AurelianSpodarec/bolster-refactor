import React from 'react';

const StatusIcon = ({ classes = 'check', iconClass = 'fa fa-check' }) => (
    <div className={`status-icon ${classes}`}>
        <i className={`${iconClass} fa-fw`} />
    </div>
);

export default StatusIcon;
