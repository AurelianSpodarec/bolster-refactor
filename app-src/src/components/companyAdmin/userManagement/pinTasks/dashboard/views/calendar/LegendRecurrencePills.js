import React from 'react';
import TaskRecurrencePill from '../../TaskRecurrencePill';

const LegendRecurrencePills = ({ stats }) => {
    return (
        <div className="pills-wrapper">
            <span>Task type:</span>
            <div className="pills">
                {stats.map((data, i) => (
                    <TaskRecurrencePill key={i} {...data} />
                ))}
            </div>
        </div>
    );
};

export default LegendRecurrencePills;
