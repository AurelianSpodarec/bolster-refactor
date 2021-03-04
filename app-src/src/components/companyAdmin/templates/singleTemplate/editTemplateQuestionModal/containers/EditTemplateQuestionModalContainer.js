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
        options: {},
        configuration: {},
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
            optionConfigurations={this.state.configuration}
            handleQuestionToggle={this.handleQuestionToggle}
        />
    );

    componentDidMount = () => {
        const { question } = this.props;
        const options = question.options.reduce((acc, { id, text }) => {
            return { ...acc, [id]: text };
        }, {});

        if (question.OptionConfigurations) {
            const configuration = question.OptionConfigurations.reduce(
                (acc, { Name, IsDisabled }) => {
                    return { ...acc, [Name]: IsDisabled };
                },
                {},
            );

            this.setState({ configuration });
        }

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

    handleQuestionToggle = id => {
        const configuration = updateObj(
            this.state.configuration,
            id,
            !this.state.configuration[id],
        );
        this.setState({ configuration });
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

        const OptionConfigurations = question.OptionConfigurations
            ? question.OptionConfigurations.map((item, index) => {
                  return {
                      ...item,
                      Name: Object.values(this.state.options)[index],
                      IsDisabled: this.state.configuration[item.Name],
                  };
              })
            : null;

        const body = OptionConfigurations
            ? {
                  questionID: question.id,
                  options: Object.values(this.state.options),
                  OptionConfigurations,
              }
            : { questionID: question.id, options: Object.values(this.state.options) };
        editTemplateQuestion(question.id, body);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templatesReducer: { postSuccess, postFailure },
    },
}) => ({
    postSuccess,
    postFailure,
});

const mapDispatchToProps = { hideModal, showModal, editTemplateQuestion };

export default connect(mapStateToProps, mapDispatchToProps)(EditTemplateQuestionModalContainer);
