import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PinAnswer from '../presentational/PinAnswer';

import { convertManufacturersOptionsToObject } from 'helpers/manufacturers';

const PinAnswersContainer = ({
    questionType,
    questions,
    questionsObj,
    pinAnswers,
    pinHistory,
    status,
    relevantAnswer,
    question,
    optionValuesLookup,
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
        optionValuesLookup={optionValuesLookup}
    />
);

const mapStateToProps = (
    {
        companyAdmin: {
            pinAnswersReducer: { answers },
            templateQuestionsReducer: { questions },
            manufacturersOptionValuesReducer: { manufacturersOptionValues },
        },
    },
    { questionID, pinHistory },
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
                    answer.pinHistoryID === pinHistory.id,
            ) || {},
        optionValuesLookup: convertManufacturersOptionsToObject(manufacturersOptionValues),
    };
};

export default withRouter(connect(mapStateToProps)(PinAnswersContainer));
