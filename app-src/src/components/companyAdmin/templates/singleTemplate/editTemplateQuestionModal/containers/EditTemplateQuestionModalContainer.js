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

        if (question.optionConfigurations) {
            let sort = 0;

            const options = question.optionConfigurations.reduce((acc, { name }) => {
                sort = sort + 1;
                return { ...acc, [name]: { value: name, sort } };
            }, {});

            const configuration = question.optionConfigurations.reduce(
                (acc, { name, isDisabled }) => {
                    return { ...acc, [name]: isDisabled };
                },
                {},
            );

            this.setState({ configuration, options });
        }
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, postFailure, hideModal, showModal } = this.props;
        if (postSuccess && !prevProps.postSuccess) hideModal();
        if (postFailure && !prevProps.postFailure) showModal(ERROR_MODAL);
    };

    handleChange = (name, value) => {
        const sort = this.state.options[name].sort;
        this.setState({ options: updateObj(this.state.options, name, { value, sort }) });
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
        const { options } = this.state;
        const latestSort = Object.values(options).sort((a, b) => b.sort - a.sort)[0].sort;
        this.setState({ options: updateObj(options, uuid(), { value: '', sort: latestSort + 1 }) });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editTemplateQuestion, question } = this.props;
        const { options, configuration } = this.state;

        const sortedOptions = Object.values(options).sort((a, b) => a.sort - b.sort);

        const optionConfigurations = question.optionConfigurations
            ? Object.keys(options).map(item => {
                  if (item in configuration) {
                      const prevObj = question.optionConfigurations.find(obj => obj.name === item);
                      return {
                          name: options[item].value,
                          isDisabled: this.state.configuration[item],
                          createdBySuperAdmin: prevObj.createdBySuperAdmin,
                          sort: options[item].sort,
                      };
                  } else {
                      return {
                          name: options[item].value,
                          isDisabled: false,
                          createdBySuperAdmin: false,
                          sort: options[item].sort,
                      };
                  }
              })
            : null;

        const body = optionConfigurations
            ? {
                  questionID: question.id,
                  options: sortedOptions.map(opt => opt.value),
                  optionConfigurations: [...optionConfigurations]
                      .sort((a, b) => a.sort - b.sort)
                      .map(({ name, isDisabled, createdBySuperAdmin }) => {
                          return { name, isDisabled, createdBySuperAdmin };
                      }),
              }
            : { questionID: question.id, options: sortedOptions.map(opt => opt.value) };
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
