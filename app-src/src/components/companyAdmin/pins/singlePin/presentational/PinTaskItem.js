import React from 'react';
import moment from 'moment';
import { DATE_TIME_DEFAULTS } from '../../../../../constants/companyAdmin/enums';

const PinTaskItem = ({ task: { companyUserName, dueOn } }) => {
    return (
        <div className="task-item">
            <div className="flex-row flex-wrap width-12">
                <strong>Assigned to:</strong> <p>{companyUserName}</p>
            </div>
            <div className="flex-row flex-wrap width-12">
                <strong>Due on:</strong>
                <p className={moment(dueOn).isBefore(moment()) ? 'red-text' : ''}>
                    {moment(dueOn).format(DATE_TIME_DEFAULTS[1])}
                </p>
            </div>
        </div>
    );
};

export default PinTaskItem;
