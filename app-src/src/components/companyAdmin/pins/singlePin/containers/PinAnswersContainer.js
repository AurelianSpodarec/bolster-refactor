import React, { Component } from 'react';
import { connect } from 'react-redux';
import PinAnswer from '../presentational/PinAnswer';

class PinAnswersContainer extends Component {
    render() {
        const { questionType } = this.props;

        return (
            <PinAnswer answer={this._getRelevantAnswer()} type={questionType} />
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
        pinAnswersReducer: { answers }
    }
}) => {
    return {
        pinAnswers: Object.values(answers)
    };
};

export default connect(mapStateToProps)(PinAnswersContainer);
