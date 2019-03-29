import React, { Component } from 'react';
import { connect } from 'react-redux';

import showModal from 'actions/generic/modals/sync/showModal';
import TemplateQuestionItem from '../presentational/TemplateQuestionItem';

class TemplateQuestionItemContainer extends Component {
    render() {
        const { question, showModal, questions } = this.props;
        return (
            <TemplateQuestionItem
                question={question}
                showModal={showModal}
                isPrereq={
                    questions.findIndex(q => q.preqUuid === question.uuid) >= 0
                }
            />
        );
    }
}

const mapStateToProps = ({ templateBuilderReducer }) => ({
    questions: Object.values(templateBuilderReducer.questions)
});

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateQuestionItemContainer);
