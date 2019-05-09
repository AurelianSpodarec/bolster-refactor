import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import EditTemplateQuestionModal from '../presentational/EditTemplateQuestionModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editTemplateQuestion from 'actions/companyAdmin/templates/async/editTemplateQuestion';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { removeObjItem, updateObj } from 'helpers/generic';

class EditTemplateQuestionModalContainer extends Component {
    state = {
        options: {}
    };

    render = () => (
        <EditTemplateQuestionModal
            options={Object.entries(this.state.options)}
            hideModal={this.props.hideModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleRemoveOption={this.handleRemoveOption}
            handleAddOption={this.handleAddOption}
            questionName={this.props.question.name}
        />
    );

    componentDidMount = () => {
        const { question } = this.props;
        const options = question.options.reduce(
            (acc, { id, text }) => ({ ...acc, [id]: text }),
            {}
        );
        this.setState({ options });
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, postFailure, hideModal, showModal } = this.props;
        if (postSuccess && !prevProps.postSuccess) hideModal();
        if (postFailure && !prevProps.postFailure) showModal(ERROR_MODAL);
    };

    handleChange = (name, value) => {
        this.setState({ options: updateObj(this.state.options, name, value) });
    };

    handleRemoveOption = key => {
        this.setState({ options: removeObjItem(this.state.options, key) });
    };

    handleAddOption = () => {
        this.setState({ options: updateObj(this.state.options, uuid(), '') });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editTemplateQuestion, question } = this.props;
        const options = Object.entries(this.state.options).map(
            ([id, text]) => ({ id, text })
        );
        editTemplateQuestion(question.id, { options });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templatesReducer: { postSuccess, postFailure }
    }
}) => ({
    postSuccess,
    postFailure
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    editTemplateQuestion: (id, postBody) =>
        dispatch(editTemplateQuestion(id, postBody))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTemplateQuestionModalContainer);
