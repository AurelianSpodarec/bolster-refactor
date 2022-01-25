import React from 'react';

const TaskPill = ({ name, title }) => {
    return (
        <button
            className="no-background-btn"
            onClick={() => {
                console.log('clicked');
            }}
        >
            <div className="task-pill" key={name}>
                <div className={`square ${name}`} />
                <div className="title">{title}</div>
            </div>
        </button>
    );
};

export default TaskPill;
