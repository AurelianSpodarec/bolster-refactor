import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import EditTemplateQuestionModal from '../presentational/EditTemplateQuestionModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import editTemplateQuestion from 'actions/companyAdmin/templates/async/editTemplateQuestion';

class EditTemplateQuestionModalContainer extends Component {
    state = {
        options: {}
    };

    render = () => {
        const { question, hideModal } = this.props;
        const { options } = this.state;
        return (
            <EditTemplateQuestionModal
                options={Object.entries(options)}
                hideModal={hideModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleRemoveOption={this.handleRemoveOption}
                handleAddOption={this.handleAddOption}
                question={question}
            />
        );
    };

    componentDidMount = () => {
        const {
            question: { options }
        } = this.props;
        const optionsForState = options.reduce(
            (acc, { id, text }) => ({ ...acc, [id]: text }),
            {}
        );
        this.setState({ options: optionsForState });
    };

    handleChange = ({ target: { value, name } }) => {
        this.setState({
            options: { ...this.state.options, [name]: value }
        });
    };

    handleRemoveOption = ({ target: { value } }) => {
        const {
            // eslint-disable-next-line no-unused-vars
            options: { [value]: removed, ...options }
        } = this.state;
        this.setState({ options });
    };

    handleAddOption = () => {
        this.setState({
            options: {
                ...this.state.options,
                [uuid()]: ''
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            editTemplateQuestion,
            question: { id }
        } = this.props;
        const options = Object.entries(this.state.options).map(
            ([id, text]) => ({ id, text })
        );
        editTemplateQuestion(id, { options });
        alert('submit');
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    editTemplateQuestion: (id, postBody) =>
        dispatch(editTemplateQuestion(id, postBody))
});

export default connect(
    null,
    mapDispatchToProps
)(EditTemplateQuestionModalContainer);
