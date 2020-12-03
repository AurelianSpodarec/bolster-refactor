import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { convertArrToObj } from 'helpers/generic';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import fetchCompanyPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';

import AttachOperativesForm from '../presentational/AttachOperativeForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import addOperatives from 'actions/companyAdmin/operatives/async/addOperatives';

class AttachOperativesFormContainer extends Component {
    state = {
        // companyUserID: '',
        companyUserIDs: [],
        serviceIDs: [],
        isTemplateFilteringEnabled: false,
        templateIDs: [],
    };

    render() {
        const {
            //  companyUserID,
            companyUserIDs,
            serviceIDs,
            isTemplateFilteringEnabled,
            templateIDs,
        } = this.state;
        const userOptions = this._getUserOptions();
        const serviceOptions = this._getServicesOptions();
        const { isFetching, error, services } = this.props;
        const showMoreServicesMesssage = serviceOptions.some(option => option.disabled === true);
        const showClientServicesMessage = serviceOptions.some(option => option.hideClientAccess);

        console.log(this.getTemplatesForService(2));

        return (
            <BlockContainer
                isFetching={isFetching}
                isEmpty={!Object.values(userOptions).length}
                noDataMessage="No operatives options available."
                error={error}
            >
                <AttachOperativesForm
                    users={Object.values(userOptions)}
                    // selectedUser={userOptions[companyUserID]}
                    serviceOptions={serviceOptions}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    companyUserIDs={companyUserIDs}
                    showMoreServicesMesssage={showMoreServicesMesssage}
                    showClientServicesMessage={showClientServicesMessage}
                    isTemplateFilteringEnabled={isTemplateFilteringEnabled}
                    templateIDs={templateIDs}
                    serviceAreas={this.getServiceAreas()}
                    services={services}
                    getTemplatesForService={this.getTemplatesForService}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const {
            fetchCompanyUsers,
            fetchCompanyPermissions,
            fetchAllTemplates,
            hierarchyID,
            hierarchyType,
        } = this.props;
        fetchCompanyUsers();
        fetchAllTemplates();
        fetchCompanyPermissions(hierarchyType, hierarchyID);
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, history, redirectUrl } = this.props;
        if (!prevProps.postSuccess && postSuccess) return history.replace(redirectUrl);
    };

    _getUserOptions = () => {
        const { operativeUsers } = this.props;

        const options = operativeUsers.map(({ id, userFirstName, userLastName, userEmail }) => ({
            value: id,
            text: `${userFirstName} ${userLastName} <${userEmail}>`,
            label: `${userFirstName} ${userLastName} <${userEmail}>`,
        }));

        return convertArrToObj(options, 'value');
    };

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
        const { templates } = this.props;

        const set = new Set();

        templates.forEach(template => set.add(template.serviceID));

        return [...set];
    };

    getTemplatesForService = serviceID => {
        const { templates } = this.props;

        const filteredTemplates = templates
            .filter(template => template.serviceID === serviceID)
            .map(({ id, name }) => {
                return {
                    value: id,
                    text: name,
                    disabled: false,
                    hideClientAccess: false,
                };
            });

        return filteredTemplates;
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { companyUserIDs, serviceIDs } = this.state;
        const { hierarchyType, hierarchyID, addOperatives } = this.props;
        const postBody = { companyUserIDs, serviceIDs };
        addOperatives(hierarchyType, hierarchyID, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            companyUsersReducer: { users, isFetching, error },
            companiesPermissionsReducer: { companiesPermissions: companyPermissions },
            servicesReducer: { services },
            subscriptionsReducer: { subscriptions },
            operativesReducer: {
                operatives,
                isFetching: fetchingOps,
                error: opsError,
                postSuccess,
            },
            templatesReducer: { templates, isFetching: fetchingTemplates, error: templatesError },
        },
        shared: {
            decodeJWTReducer: {
                jwtData: { companyID },
            },
        },
    },
    { match: { params, url }, operativeUsers },
) => ({
    redirectUrl: url.replace('/add-operative', ''),
    hierarchyID: params.id,
    operativeUsers: operativeUsers || Object.values(users),
    services,
    subscriptions: subscriptions.serviceIDs || [],
    isFetching: isFetching || fetchingOps || fetchingTemplates,
    error: error || opsError || templatesError,
    postSuccess,
    drawingUserIDs: Object.values(operatives).map(({ companyUserID }) => companyUserID),
    companyPermissions: Object.values(companyPermissions),
    companyID,
    templates: Object.values(templates),
});

const mapDispatchToProps = {
    fetchCompanyUsers,
    addOperatives,
    fetchCompanyPermissions,
    fetchAllTemplates,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AttachOperativesFormContainer),
);
