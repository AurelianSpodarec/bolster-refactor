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
    <div
        className="size-lg-12"
        style={{ ...style, opacity: isDragging ? 0 : 1 }}
    >
        <p className="size-lg-3">{question.name}</p>
        <p className="size-lg-3">{QUESTION_TYPES[question.questionType]}</p>
        <p className="size-lg-2">
            <input
                type="checkbox"
                disabled
                readOnly
                checked={question.isRequired}
            />
        </p>
        <div className="size-lg-4">
            {isPrereq ? (
                <TooltipContainer text="This item is a prerequiste, you must first remove it's dependats.">
                    <button disabled className="button red icon-only">
                        <i className="far fa-trash-alt" />
                    </button>
                </TooltipContainer>
            ) : (
                <button
                    className="button red icon-only"
                    onClick={deleteQuestion}
                >
                    <i className="far fa-trash-alt" />
                </button>
            )}
            <button
                className="button yellow icon-only"
                onClick={showEditQuesModel}
            >
                <i className="far fa-pencil" />
            </button>
        </div>
    </div>
);

export default Question;
