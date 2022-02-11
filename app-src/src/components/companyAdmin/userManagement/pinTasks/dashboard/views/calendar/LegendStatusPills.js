import React from 'react';
import TaskStatusPill from '../../TaskStatusPill';

const LegendStatusPills = ({ labelOptions }) => {
    return (
        <div className="pills-wrapper">
            <span>Task status:</span>
            <div className="pills">
                {labelOptions.map((data, i) => (
                    <TaskStatusPill key={i} {...data} />
                ))}
            </div>
        </div>
    );
};

export default LegendStatusPills;
