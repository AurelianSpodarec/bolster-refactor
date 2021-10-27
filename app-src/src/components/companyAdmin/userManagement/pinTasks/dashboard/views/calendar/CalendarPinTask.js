import React from 'react';
import useTypeAndStatus from '../hooks/useTypeAndStatus';

const CalendarPinTask = ({ isRecurring, actionedOn, dueOn, pinCode }) => {
    const { type, status } = useTypeAndStatus(isRecurring, actionedOn, dueOn);

    return (
        <div className="task">
            <div className="group">
                <div className={`circle ${type}`} />
                <div className={`circle ${status}`} />
            </div>
            <div className="group">
                <p className="name">{pinCode}</p>
            </div>
        </div>
    );
};

export default CalendarPinTask;
