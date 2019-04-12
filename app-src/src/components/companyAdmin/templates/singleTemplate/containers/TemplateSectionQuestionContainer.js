import React, { Component } from 'react';
import { connect } from 'react-redux';

import TemplateSectionQuestion from '../presentational/TemplateSectionQuestion';
import selectQuestion from 'actions/companyAdmin/templates/sync/selectQuestion';

class TemplateSectionQuestionContainer extends Component {
    render = () => {
        const { question, selectQuestion } = this.props;

        return (
            <TemplateSectionQuestion
                question={question}
                selectQuestion={selectQuestion}
            />
        );
    };
}

const mapDispatchToProps = dispatch => ({
    selectQuestion: id => dispatch(selectQuestion(id))
});

export default connect(
    null,
    mapDispatchToProps
)(TemplateSectionQuestionContainer);
