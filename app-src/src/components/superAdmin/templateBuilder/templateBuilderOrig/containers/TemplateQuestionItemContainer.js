import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EDIT_TEMPLATE_QUESTION } from 'constants/modalTypes';
import showModal from 'actions/generic/modals/sync/showModal';
import deleteQuestion from 'actions/superAdmin/templateBuilder/sync/deleteQuestion';

import TemplateQuestionItem from '../presentational/TemplateQuestionItem';

class TemplateQuestionItemContainer extends Component {
    render() {
        const { question, showModal, deleteQuestion, questions } = this.props;
        return (
            <TemplateQuestionItem
                question={question}
                isPrereq={questions.some(
                    item => item.prereqUuid === question.uuid
                )}
                showEditQuestion={() =>
                    showModal(EDIT_TEMPLATE_QUESTION, {
                        uuid: question.uuid
                    })
                }
                deleteQuestion={() => deleteQuestion}
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
    },
    deleteQuestion: uuid => {
        dispatch(deleteQuestion(uuid));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateQuestionItemContainer);
