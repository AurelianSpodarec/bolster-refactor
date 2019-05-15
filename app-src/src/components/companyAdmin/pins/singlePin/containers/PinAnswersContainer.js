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
    relevantAnswer
}) =>
    console.log({
        questionType,
        questions,
        pinAnswers,
        pinHistory,
        status,
        relevantAnswer
    }) || (
        <PinAnswer
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
        companyAdmin: {
            pinAnswersReducer: { answers },
            pinHistoriesReducer: { histories, selectedHistoryId },
            templateQuestionsReducer: { questions }
        }
    },
    { questionID, pinHistory }
) => {
    const history = histories[selectedHistoryId] || {};
    const pinAnswers = Object.values(answers);
    return {
        status: history.status,
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
