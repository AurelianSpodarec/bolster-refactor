import React from 'react';
import TaskRecurrencePill from '../../TaskRecurrencePill';

const LegendRecurrencePills = ({ labelOptions }) => {
    return (
        <div className="pills-wrapper">
            <span>Task type:</span>
            <div className="pills">
                {labelOptions.map((data, i) => (
                    <TaskRecurrencePill key={i} {...data} />
                ))}
            </div>
        </div>
    );
};

export default LegendRecurrencePills;
