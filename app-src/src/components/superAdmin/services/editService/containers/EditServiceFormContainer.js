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
import removeTemplatesFromService from 'actions/superAdmin/services/async/removeTemplatesFromService';

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
        const {
            fetchSingleService,
            fetchTemplateForService,
            fetchTemplatesSimple,
            id
        } = this.props;
        fetchTemplatesSimple();
        fetchSingleService(id);
        fetchTemplateForService(id);
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
            const templateUUIDs = serviceTemplate.templateIDs.map(String);
            this.setState({ templateUUIDs });
        }
    };

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();
        const {
            editService,
            id,
            postTemplatesForService,
            removeTemplatesFromService,
            serviceTemplate
        } = this.props;
        const { name, showOnCompanySite, templateUUIDs } = this.state;
        editService(id, name, showOnCompanySite);

        const templatesToAdd = templateUUIDs.filter(
            uuid => !serviceTemplate.templateIDs.includes(+uuid)
        );

        const templatesToRemove = serviceTemplate.templateIDs.filter(
            tempID => !templateUUIDs.includes(String(tempID))
        );

        if (templatesToAdd.length) {
            postTemplatesForService(id, { templateIDs: templatesToAdd });
        }
        if (templatesToRemove.length) {
            removeTemplatesFromService(id, { templateIDs: templatesToRemove });
        }
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
            templatesReducer: { templates, isFetching: isFetchingTemplates, error: templatesError }
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
    templates: Object.values(templates).filter(({ isDeleted }) => !isDeleted)
});

const mapDispatchToProps = {
    fetchSingleService,
    postTemplatesForService,
    removeTemplatesFromService,
    fetchTemplatesSimple,
    fetchTemplateForService,
    editService
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditServiceFormContainer)
);
