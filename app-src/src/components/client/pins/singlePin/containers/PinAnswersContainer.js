import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PinAnswer from '../presentational/PinAnswer';

const PinAnswersContainer = ({ questionType, pinAnswers, relevantAnswer, question }) => (
    <PinAnswer
        question={question}
        answers={pinAnswers}
        trimmedAnswer={relevantAnswer}
        type={questionType}
    />
);

const mapStateToProps = (
    {
        client: {
            pinAnswersReducer: { answers },
        },
    },
    { questionID, pinHistory },
) => {
    const pinAnswers = Object.values(answers);
    return {
        pinAnswers,
        relevantAnswer:
            pinAnswers.find(
                answer =>
                    answer.templateQuestionID === questionID &&
                    answer.pinHistoryID === pinHistory.id,
            ) || {},
    };
};

export default withRouter(connect(mapStateToProps)(PinAnswersContainer));
