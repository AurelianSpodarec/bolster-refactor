import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddPinQuestions from '../presentational/AddPinQuestions';

class AddPinQuestionsContainer extends Component {
    render() {
        const { sections, questions } = this.props;

        return (
            <AddPinQuestions
                sections={Object.values(sections)}
                questions={questions}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { questions }
    }
}) => ({
    questions: Object.values(questions)
});

export default connect(mapStateToProps)(AddPinQuestionsContainer);
