import React from 'react';

import { QUESTION_TYPES } from 'constants/templateBuilder';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginTop: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

const Question = ({
    isDragging,
    question,
    showEditQuesModel,
    deleteQuestion,
    isPrereq
}) => (
    <div style={{ ...style, opacity: isDragging ? 0 : 1 }}>
        <p>name - {question.name}</p>
        <p>type - {QUESTION_TYPES[question.questionType]}</p>
        <p>
            required? -{' '}
            <input type="checkbox" readOnly checked={question.isRequired} />
        </p>
        <button className="button" onClick={showEditQuesModel}>
            Edit
        </button>
        {!isPrereq && (
            <button className="button red icon-only" onClick={deleteQuestion}>
                <i className="fa fa-times" />
            </button>
        )}
    </div>
);

export default Question;
