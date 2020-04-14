import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PinAnswer from '../presentational/PinAnswer';

const PinAnswersContainer = ({
    questionType,
    questions,
    questionsObj,
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
            questionsObj={questionsObj}
            type={questionType}
            pinHistory={pinHistory}
            status={status}
        />
    );

const mapStateToProps = (
    {
        companyAdmin: {
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
        questionsObj: questions,
        relevantAnswer:
            pinAnswers.find(
                answer =>
                    answer.templateQuestionID === questionID &&
                    answer.pinHistoryID === pinHistory.id
            ) || {}
    };
};

export default withRouter(connect(mapStateToProps)(PinAnswersContainer));
