import React from 'react';

import moment from 'moment';
import { DATE_TIME_DEFAULTS } from '../../../../../constants/companyAdmin/enums';

const PinSeriesItem = ({
    task: { companyUserName, recurrenceStartsOn, recurrenceEndsOn, nextTaskDate },
}) => {
    return (
        <div className="task-item">
            <div className="flex-row width-12">
                <strong>Assigned to:</strong> <p>{companyUserName}</p>
            </div>
            <div className="flex-row width-12">
                <strong>Starts on:</strong>
                <p>{moment(recurrenceStartsOn).format(DATE_TIME_DEFAULTS[1])}</p>
            </div>
            <div className="flex-row width-12">
                <strong>Ends on:</strong>
                <p>{moment(recurrenceEndsOn).format(DATE_TIME_DEFAULTS[1])}</p>
            </div>
            <div className="flex-row width-12">
                <strong>Next task date:</strong>
                <p className={moment(nextTaskDate).isBefore(moment()) ? 'red-text' : ''}>
                    {moment(nextTaskDate).format(DATE_TIME_DEFAULTS[1])}
                </p>
            </div>
        </div>
    );
};

export default PinSeriesItem;
