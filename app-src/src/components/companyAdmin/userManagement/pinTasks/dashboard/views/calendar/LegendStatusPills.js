import React from 'react';
import TaskStatusPill from '../../TaskStatusPill';

const LegendStatusPills = ({ stats }) => {
    return (
        <div className="pills-wrapper">
            <span>Task status:</span>
            <div className="pills">
                {stats.map((data, i) => (
                    <TaskStatusPill key={i} {...data} />
                ))}
            </div>
        </div>
    );
};

export default LegendStatusPills;
