import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import EditDrawingOperativeForm from '../presentational/EditDrawingOperativeForm';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import editDrawingOperative from 'actions/companyAdmin/operatives/async/editDrawingOperative';
import fetchCompanyPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';

import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';

class EditDrawingOperativeFormContainer extends Component {
    state = {
        serviceIDs: [],
        isTemplateFilteringEnabled: false,
        templateIDs: [],
    };

    render() {
        const { match, operative, isFetching, error, services } = this.props;
        const { serviceIDs, isTemplateFilteringEnabled } = this.state;
        const { id } = match.params;
        const backUrl = `/company/drawings/${id}`;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(operative)}
                noWhiteBackground
            >
                <EditDrawingOperativeForm
                    operative={operative}
                    handleSubmit={this.handleSubmit}
                    handleMultiSelect={this.handleMultiselect}
                    serviceOptions={this._getServicesOptions()}
                    services={services}
                    serviceIDs={serviceIDs}
                    isFetching={isFetching}
                    backUrl={backUrl}
                    isTemplateFilteringEnabled={isTemplateFilteringEnabled}
                    serviceAreas={this.getServiceAreas()}
                    getTemplatesForService={this.getTemplatesForService}
                    getSelectedTemplates={this.getSelectedTemplates}
                    selectedTemplates={this.getSelectedTemplates()}
                />
            </BlockContainer>
        );
    }
    componentDidMount() {
        const { fetchOperativesForDrawing, match, fetchCompanyPermissions, fetchAllTemplates } =
            this.props;
        const { id } = match.params;
        fetchOperativesForDrawing(id);
        fetchAllTemplates();
        fetchCompanyPermissions(HIERARCHY_IDS.DRAWING, id);
    }

    componentDidUpdate(prevProps) {
        const { isFetching, postSuccess, history, match, operative, templates } = this.props;
        if (!isFetching && prevProps.isFetching && operative) {
            const serviceIDs = operative.serviceIDs.map(id => id + '');
            let templateIDs = [];

            if (operative.templateIDs) {
                templateIDs = operative.templateIDs.map(id => id + '');
            } else {
                const serviceAreas = this.getServiceAreas();

                const templatesArr = [];

                templates
                    .filter(template => serviceAreas.includes(template.serviceID))
                    .forEach(template => {
                        templatesArr.push(template.id + '');
                    });

                templateIDs = templatesArr;
            }

            this.setState({
                serviceIDs,
                templateIDs,
                isTemplateFilteringEnabled: operative.isTemplateFilteringEnabled,
            });
        }
        if (postSuccess && !prevProps.postSuccess)
            history.push(`/company/drawings/${match.params.id}`);
    }

    _getServicesOptions = () => {
        const { services, subscriptions, companyPermissions, companyID } = this.props;
        const relevantPermissions = companyPermissions.filter(perm => perm.companyID === companyID);
        return Object.values(services).map(({ id, name }) => {
            const hasSub = subscriptions.includes(id);
            // relevant service match or null, which implies all access
            const hasAccess = !!relevantPermissions.find(
                perm => perm.serviceID === id || perm.serviceID === null,
            );
            return {
                value: id,
                text: name,
                disabled: !(hasSub && hasAccess),
                hideClientAccess: !hasAccess,
            };
        });
    };

    getServiceAreas = () => {
        const { companyPermissions, companyID, subscriptions, templates } = this.props;

        const set = new Set();

        templates.forEach(template => set.add(template.serviceID));

        const filteredArray = [];

        [...set].forEach(serviceID => {
            const relevantPermissions = companyPermissions.filter(
                perm => perm.companyID === companyID,
            );
            const hasSub = subscriptions.includes(serviceID);
            // relevant service match or null, which implies all access
            const hasAccess = !!relevantPermissions.find(
                perm => perm.serviceID === serviceID || perm.serviceID === null,
            );

            if (hasSub && hasAccess) filteredArray.push(serviceID);
        });

        return filteredArray;
    };

    getTemplatesForService = serviceID => {
        const { templates } = this.props;
        const filteredTemplates = templates
            .filter(template => template.serviceID === serviceID)
            .map(({ id, name, isDeleted }) => {
                return {
                    value: id,
                    text: name,
                    disabled: false,
                    hideClientAccess: false,
                    isDeleted,
                };
            });

        return filteredTemplates;
    };

    getSelectedTemplates = () => {
        const { templates } = this.props;
        const { serviceIDs, templateIDs } = this.state;

        const selectedIDs = [];

        templates.filter(template => {
            if (serviceIDs.includes(template.serviceID + '')) {
                return selectedIDs.push(template.id + '');
            }
        });

        return templateIDs.filter(template => selectedIDs.includes(template));
    };

    handleSubmit = e => {
        e.preventDefault();
        const { serviceIDs, isTemplateFilteringEnabled, templateIDs } = this.state;
        const { editDrawingOperative, match } = this.props;
        const { operativeID } = match.params;
        editDrawingOperative(operativeID, { serviceIDs, isTemplateFilteringEnabled, templateIDs });
    };

    handleMultiselect = (name, value) => {
        this.setState({ [name]: value });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            operativesReducer,
            servicesReducer,
            subscriptionsReducer,
            companiesPermissionsReducer: { companiesPermissions: companyPermissions },
            templatesReducer: { templates, isFetching: fetchingTemplates, error: templatesError },
        },
        shared: {
            decodeJWTReducer: {
                jwtData: { companyID },
            },
        },
    },
    ownProps,
) => ({
    operative: operativesReducer.operatives[ownProps.match.params.operativeID] || null,
    isFetching: operativesReducer.isFetching || servicesReducer.isFetching || fetchingTemplates,
    postSuccess: operativesReducer.postSuccess,
    services: servicesReducer.services || [],
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    companyPermissions: Object.values(companyPermissions),
    companyID,
    templates: Object.values(templates),
    error: templatesError,
});

const mapDispatchToProps = {
    fetchOperativesForDrawing,
    fetchAllServices,
    editDrawingOperative,
    fetchCompanyPermissions,
    fetchAllTemplates,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditDrawingOperativeFormContainer),
);
