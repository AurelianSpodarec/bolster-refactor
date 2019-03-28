import React, { Component } from 'react';
import { connect } from 'react-redux';

import showModal from 'actions/generic/modals/sync/showModal';
import TemplateQuestionItem from '../presentational/TemplateQuestionItem';

class TemplateQuestionItemContainer extends Component {
    render() {
        const { question, showModal } = this.props;
        return (
            <TemplateQuestionItem question={question} showModal={showModal} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(TemplateQuestionItemContainer);
