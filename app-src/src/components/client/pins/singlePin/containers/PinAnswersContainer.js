import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PinAnswer from '../presentational/PinAnswer';

const PinAnswersContainer = ({
    questionType,
    questions,
    pinAnswers,
    pinHistory,
    status,
    relevantAnswer,
    question
}) => (
    <PinAnswer
        question={question}
        answers={pinAnswers}
        trimmedAnswer={relevantAnswer}
        questions={questions}
        type={questionType}
        pinHistory={pinHistory}
        status={status}
    />
);

const mapStateToProps = (
    {
        client: {
            pinAnswersReducer: { answers },
            templateQuestionsReducer: { questions }
        }
    },
    { questionID, pinHistory }
) => {
    const pinAnswers = Object.values(answers);
    return {
        status: pinHistory.status,
        pinAnswers,
        questions: Object.values(questions),
        relevantAnswer:
            pinAnswers.find(
                answer =>
                    answer.templateQuestionID === questionID &&
                    answer.pinHistoryID === pinHistory.id
            ) || {}
    };
};

export default withRouter(connect(mapStateToProps)(PinAnswersContainer));
