import React from 'react';

import { QUESTION_TYPES } from 'constants/superAdmin/templateBuilder';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

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
        {isPrereq ? (
            <TooltipContainer text="This item is a prerequiste, you must first remove it's dependats.">
                <button disabled className="button red icon-only">
                    <i className="fa fa-times" />
                </button>
            </TooltipContainer>
        ) : (
            <button
                disabled
                className="button red icon-only"
                onClick={deleteQuestion}
            >
                <i className="fa fa-times" />
            </button>
        )}
    </div>
);

export default Question;
