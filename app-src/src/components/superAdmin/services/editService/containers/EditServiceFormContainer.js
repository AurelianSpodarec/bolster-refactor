import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { convertArrToObj } from 'helpers/generic';
import EditServiceForm from '../presentational/EditServiceForm';
import fetchSingleService from 'actions/superAdmin/services/async/fetchSingleService';
import editService from 'actions/superAdmin/services/async/editService';
import fetchTemplateForService from 'actions/superAdmin/services/async/fetchTemplateForService';
import fetchTemplates from 'actions/superAdmin/templateBuilder/async/fetchTemplates';
import postTemplatesForService from 'actions/superAdmin/services/async/postTemplatesForService';

class EditServiceFormContainer extends Component {
    state = {
        name: '',
        templateUUIDs: []
    };

    render() {
        const templateOptions = this._getTemplateOptions();

        return (
            <EditServiceForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                templateOptions={Object.values(templateOptions)}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchTemplates();

        this.props.fetchSingleService(this.props.id);
        this.props.fetchTemplateForService(this.props.id);
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            history,
            isFetching,
            service,
            serviceTemplate
        } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            return history.push('/admin/services');
        }
        if (!isFetching && prevProps.isFetching) {
            this.setState({
                name: service.name
            });
        }
        if (
            Object.values(prevProps.serviceTemplate).length < 1 &&
            Object.values(serviceTemplate).length > 0
        ) {
            this.setState({
                templateUUIDs: [`${serviceTemplate.templateIDs}`]
            });
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.editService(this.props.id, this.state.name);
        this.props.postTemplatesForService(this.props.id, {
            templateIDs: this.state.templateUUIDs
        });
    };

    _getTemplateOptions = () => {
        const { templates } = this.props;

        const options = templates
            .map(({ name, uuid }) => {
                return {
                    label: name,
                    text: name,
                    value: uuid
                };
            })
            .sort((a, b) => a.label.localeCompare(b.label));

        return convertArrToObj(options, 'value');
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            adminServicesReducer: {
                isFetching,
                postSuccess,
                adminServices,
                adminServiceTemplates
            },
            templatesReducer: { templates }
        }
    },
    {
        match: {
            params: { id }
        }
    }
) => ({
    isFetching,
    postSuccess,
    id,
    service: adminServices[id],
    serviceTemplate: adminServiceTemplates,
    templates: Object.values(templates)
});

const mapDispatchToProps = dispatch => ({
    fetchSingleService: id => {
        return dispatch(fetchSingleService(id));
    },
    postTemplatesForService: (serviceID, postBody) => {
        return dispatch(postTemplatesForService(serviceID, postBody));
    },
    fetchTemplateForService: serviceID => {
        return dispatch(fetchTemplateForService(serviceID));
    },
    fetchTemplates: () => {
        dispatch(fetchTemplates());
    },
    editService: (id, name) => {
        dispatch(editService(id, name));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditServiceFormContainer)
);
