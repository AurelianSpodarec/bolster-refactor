import React, { Component } from 'react';
import { connect } from 'react-redux';
import PinQuestion from '../presentational/PinQuestion';

class PinQuestionsContainer extends Component {
    render() {
        const { sectionID, templateQuestions } = this.props;

        const relevantQuestions = templateQuestions.filter(
            question => question.templateSectionID === sectionID
        );

        return <PinQuestion questions={relevantQuestions} />;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { questions }
    }
}) => {
    return {
        templateQuestions: Object.values(questions)
    };
};

export default connect(mapStateToProps)(PinQuestionsContainer);
