import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditTemplateQuestionModal from '../presentational/EditTemplateQuestionModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class EditTemplateQuestionModalContainer extends Component {
    state = {
        options: {},
        addingOption: false,
        newOption: ''
    };

    render = () => {
        const { addingOption, options, newOption } = this.state;
        return (
            <EditTemplateQuestionModal
                addingOption={addingOption}
                options={Object.entries(options)}
                newOption={newOption}
                hideModal={this.props.hideModal}
                handleChange={this.handleChange}
                handleNewOptionChange={this.handleNewOptionChange}
                handleSubmit={this.handleSubmit}
                handleRemoveOption={this.handleRemoveOption}
                handleShowAddOption={this.handleShowAddOption}
                handleAddOption={this.handleAddOption}
            />
        );
    };

    componentDidMount = () => {
        const {
            question: { options }
        } = this.props;
        const optionsForState = options.reduce(
            (acc, curr) => ({ ...acc, [curr.id]: [curr.text] }),
            {}
        );
        this.setState({ options: optionsForState });
    };

    handleChange = ({ target: { value, name } }) => {
        const { options } = this.state;
        this.setState({
            options: { ...options, [name]: value }
        });
    };

    handleNewOptionChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    handleRemoveOption = ({ target: { value } }) => {
        // ? No confirmation
        const {
            // eslint-disable-next-line no-unused-vars
            options: { [value]: removed, ...options }
        } = this.state;
        this.setState({ options });
    };

    handleShowAddOption = () => {
        this.setState({ addingOption: true, newOption: '' });
    };

    handleAddOption = () => {
        const { options, newOption } = this.state;
        // ! add actual new option
        this.setState({
            addingOption: false,
            newOption: '',
            options: {
                ...options,
                // ## Obviously change this ##
                [Math.floor(Math.random() * 15653522432.359264)]: newOption
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        alert('submit');
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal())
});

export default connect(
    null,
    mapDispatchToProps
)(EditTemplateQuestionModalContainer);
