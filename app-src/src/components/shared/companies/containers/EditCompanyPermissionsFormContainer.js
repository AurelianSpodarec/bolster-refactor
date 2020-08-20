import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCompanyPermissionsForm from '../presentational/EditCompanyPermissionsForm';
import addCompanyPermissions from 'actions/companyAdmin/companiesPermissions/async/addCompanyPermissions';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import {
    TEMPLATE_USAGE_RULES_VALUES as USAGE_RULES,
    TEMPLATE_USAGE_RULES,
} from 'constants/companyAdmin/enums';
import { enumFormat } from 'helpers/generic';

class EditCompanyPermissionsFormContainer extends Component {
    state = {
        serviceIDs: [],
        templateUsageRule: USAGE_RULES.USE_ANY,
    };

    render() {
        const templateRules = enumFormat(TEMPLATE_USAGE_RULES);
        const { serviceIDs, templateUsageRule } = this.state;
        const serviceOptions = this._getServicesOptions();
        const { error, hierarchyType } = this.props;
        const showMoreServicesMesssage = serviceOptions.some(option => option.disabled === true);

        return (
            <BlockContainer error={error}>
                <EditCompanyPermissionsForm
                    {...this.state}
                    serviceOptions={serviceOptions}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    hierarchyType={hierarchyType}
                    templateRules={templateRules}
                    templateUsageRule={templateUsageRule}
                    showMoreServicesMesssage={showMoreServicesMesssage}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const {
            success,
            history,
            redirectUrl,
            isFetching,
            fetchSuccess,
            companiesPermissions,
        } = this.props;
        if (!prevProps.success && success) return history.replace(redirectUrl);

        if (prevProps.isFetching && !isFetching && fetchSuccess) {
            let serviceIDs = [];

            companiesPermissions.map(permission => {
                serviceIDs.push(permission.serviceID + '');
            });

            this.setState({
                serviceIDs,
            });
        }
    };

    _getServicesOptions = () => {
        const { services, subscriptions } = this.props;
        return services.map(({ id, name }) => ({
            value: id,
            text: name,
            disabled: !subscriptions.includes(id),
        }));
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { serviceIDs, templateUsageRule } = this.state;
        const { hierarchyType, hierarchyID, addCompanyPermissions } = this.props;

        const postBody = {
            serviceIDs,
            templateUsageRule,
        };

        addCompanyPermissions(hierarchyType, hierarchyID, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            servicesReducer: { services },
            subscriptionsReducer: { subscriptions },
            companiesPermissionsReducer: {
                postSuccess,
                error,
                isFetching,
                fetchSuccess,
                companiesPermissions,
            },
        },
    },
    { match: { url, params } },
) => ({
    hierarchyID: params.id,
    redirectUrl: url.replace('/invite-company', ''),
    services: Object.values(services),
    subscriptions: subscriptions.serviceIDs || [],
    success: postSuccess,
    error,
    isFetching,
    fetchSuccess,
    companiesPermissions: Object.values(companiesPermissions),
});

const mapDispatchToProps = { addCompanyPermissions };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditCompanyPermissionsFormContainer),
);
