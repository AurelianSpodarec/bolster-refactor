import React from 'react';

import {
    QUESTION_TYPES,
    QUESTION_TYPE_NUMBERS
} from 'constants/shared/templateBuilder';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const style = {};

const StausQuestion = ({ isDragging, question, showEditQuesModel }) => (
    <div
        className="question-item size-lg-12"
        style={{ ...style, opacity: isDragging ? 0 : 1 }}
    >
        <p className="size-lg-3">{question.name}</p>
        <div className="size-lg-2">
            <button
                className="button yellow icon-only"
                onClick={showEditQuesModel}
            >
                <i className="far fa-pencil" />
            </button>
        </div>
    </div>
);

const GenericQuestion = ({
    isDragging,
    question,
    showEditQuesModel,
    deleteQuestion,
    isPrereq
}) => (
    <div
        className="question-item size-lg-12"
        style={{ ...style, opacity: isDragging ? 0 : 1 }}
    >
        <p className="size-lg-3">{question.name}</p>
        {question.questionType !== QUESTION_TYPE_NUMBERS.STATUS && (
            <>
                <p className="size-lg-3">
                    {QUESTION_TYPES[question.questionType]}
                </p>
                <p className="size-lg-2">
                    <input
                        type="checkbox"
                        disabled
                        readOnly
                        checked={question.isRequired}
                    />
                </p>
                <p className="size-lg-2">
                    <input
                        type="checkbox"
                        disabled
                        readOnly
                        checked={question.isHidden}
                    />
                </p>
            </>
        )}

        <div className="size-lg-2">
            {question.questionType !== QUESTION_TYPE_NUMBERS.STATUS &&
                (isPrereq ? (
                    <TooltipContainer text="This item is a prerequisite, you must first remove it's dependents.">
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
                ))}

            <button
                className="button yellow icon-only"
                onClick={showEditQuesModel}
            >
                <i className="far fa-pencil" />
            </button>
        </div>
    </div>
);

const Question = props => {
    if (props.question.questionType === QUESTION_TYPE_NUMBERS.STATUS)
        return <StausQuestion {...props} />;

    return <GenericQuestion {...props} />;
};

export default Question;
