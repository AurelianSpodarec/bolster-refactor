import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditPinQuestions from '../presentational/EditPinQuestions';

class EditPinQuestionsContainer extends Component {
    render() {
        const { sections, questions, answers } = this.props;

        return (
            <EditPinQuestions
                sections={Object.values(sections)}
                questions={questions}
                answers={answers}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { questions },
        pinAnswersReducer: { answers }
    }
}) => ({
    questions: Object.values(questions),
    answers: answers
});

export default connect(mapStateToProps)(EditPinQuestionsContainer);
