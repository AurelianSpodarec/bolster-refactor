import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { convertArrToObj, isEmpty } from 'helpers/generic';
import EditServiceForm from '../presentational/EditServiceForm';
import fetchSingleService from 'actions/superAdmin/services/async/fetchSingleService';
import editService from 'actions/superAdmin/services/async/editService';
import fetchTemplateForService from 'actions/superAdmin/services/async/fetchTemplateForService';
import postTemplatesForService from 'actions/superAdmin/services/async/postTemplatesForService';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchTemplatesSimple from 'actions/superAdmin/templateBuilder/async/fetchTemplatesSimple';

class EditServiceFormContainer extends Component {
    state = {
        name: '',
        templateUUIDs: [],
        showOnCompanySite: true
    };

    render() {
        const templateOptions = this._getTemplateOptions();
        const { isFetchingTemplates, templatesError, templates } = this.props;

        return (
            <BlockContainer
                isFetching={isFetchingTemplates}
                error={templatesError}
                isEmpty={isEmpty(templates)}
                noWhiteBackground
            >
                <EditServiceForm
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmit}
                    templateOptions={Object.values(templateOptions)}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        this.props.fetchTemplatesSimple();

        this.props.fetchSingleService(this.props.id);
        this.props.fetchTemplateForService(this.props.id);
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            history,
            isFetching,
            service,
            serviceTemplate,
            isFetchingTemplateForService
        } = this.props;
        if (!prevProps.postSuccess && postSuccess) {
            return history.push('/admin/services');
        }
        if (!isFetching && prevProps.isFetching) {
            this.setState({
                name: service.name,
                showOnCompanySite: service.showOnCompanySite
            });
        }
        if (
            prevProps.isFetchingTemplateForService &&
            !isFetchingTemplateForService &&
            !isEmpty(serviceTemplate)
        ) {
            this.setState({
                templateUUIDs: serviceTemplate.templateIDs.map(String)
            });
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.editService(
            this.props.id,
            this.state.name,
            this.state.showOnCompanySite
        );
        this.props.postTemplatesForService(this.props.id, {
            templateIDs: this.state.templateUUIDs
        });
    };

    _getTemplateOptions = () => {
        const { templates } = this.props;

        const options = templates
            .map(({ name, uuid, companyName }) => {
                return {
                    label: `${companyName} - ${name}`,
                    text: `${companyName} - ${name}`,
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
                adminServiceTemplates,
                isFetchingTemplateForService
            },
            templatesReducer: {
                templates,
                isFetching: isFetchingTemplates,
                error: templatesError
            }
        }
    },
    {
        match: {
            params: { id }
        }
    }
) => ({
    isFetching,
    isFetchingTemplateForService,
    isFetchingTemplates,
    templatesError,
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
    fetchTemplatesSimple: () => {
        dispatch(fetchTemplatesSimple());
    },
    editService: (id, name, showOnCompanySite) => {
        dispatch(editService(id, name, showOnCompanySite));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditServiceFormContainer)
);
