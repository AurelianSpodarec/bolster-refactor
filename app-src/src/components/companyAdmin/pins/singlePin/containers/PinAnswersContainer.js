import React, { Component } from 'react';
import { connect } from 'react-redux';
import PinAnswer from '../presentational/PinAnswer';

class PinAnswersContainer extends Component {
    render() {
        const { questionType, questions, pinAnswers } = this.props;

        return (
            <PinAnswer
                answers={pinAnswers}
                trimmedAnswer={this._getRelevantAnswer()}
                questions={questions}
                type={questionType}
            />
        );
    }

    _getRelevantAnswer = () => {
        const { questionID, pinAnswers } = this.props;

        const relevantAnswer = pinAnswers.filter(
            answer => answer.templateQuestionID === questionID
        );

        const answer = {
            id: relevantAnswer[0].id,
            answer: relevantAnswer[0].answer
        };

        return answer;
    };
}

const mapStateToProps = ({
    companyAdmin: {
        pinAnswersReducer: { answers },
        templateQuestionsReducer: { questions }
    }
}) => {
    return {
        pinAnswers: Object.values(answers),
        questions: Object.values(questions)
    };
};

export default connect(mapStateToProps)(PinAnswersContainer);
