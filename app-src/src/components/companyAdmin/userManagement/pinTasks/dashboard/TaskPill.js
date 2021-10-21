import React from 'react';

const TaskPill = ({ name, title }) => {
    return (
        <div className="task-pill" key={name}>
            <div className={`square ${name}`} />
            <div className="title">{title}</div>
        </div>
    );
};

export default TaskPill;
