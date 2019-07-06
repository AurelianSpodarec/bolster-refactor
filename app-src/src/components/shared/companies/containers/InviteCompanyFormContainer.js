import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InviteCompanyForm from '../presentational/InviteCompanyForm';
import addCompanyPermissions from 'actions/companyAdmin/companiesPermissions/async/addCompanyPermissions';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import {
    TEMPLATE_USAGE_RULES_VALUES as USAGE_RULES,
    TEMPLATE_USAGE_RULES
} from 'constants/companyAdmin/enums';
import { enumFormat } from 'helpers/generic';

class InviteCompanyFormContainer extends Component {
    state = {
        companyCode: '',
        serviceIDs: [],
        templateUsageRule: USAGE_RULES.USE_ANY
    };

    render() {
        const templateRules = enumFormat(TEMPLATE_USAGE_RULES);
        const { serviceIDs, templateUsageRule } = this.state;
        const serviceOptions = this._getServicesOptions();
        const { error, hierarchyType } = this.props;

        return (
            <BlockContainer error={error}>
                <InviteCompanyForm
                    {...this.state}
                    serviceOptions={serviceOptions}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    hierarchyType={hierarchyType}
                    templateRules={templateRules}
                    templateUsageRule={templateUsageRule}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { success, history, redirectUrl } = this.props;
        if (!prevProps.success && success) return history.replace(redirectUrl);
    };

    _getServicesOptions = () => {
        const { services, subscriptions } = this.props;
        return services.map(({ id, name }) => ({
            value: id,
            text: name,
            disabled: !subscriptions.includes(id)
        }));
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { companyCode, serviceIDs, templateUsageRule } = this.state;
        const {
            hierarchyType,
            hierarchyID,
            addCompanyPermissions
        } = this.props;

        const postBody = {
            companyCode,
            serviceIDs,
            templateUsageRule
        };

        addCompanyPermissions(hierarchyType, hierarchyID, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            servicesReducer: { services },
            subscriptionsReducer: { subscriptions },
            companiesPermissionsReducer: { postSuccess, error }
        }
    },
    { match: { url, params } }
) => ({
    hierarchyID: params.id,
    redirectUrl: url.replace('/invite-company', ''),
    services: Object.values(services),
    subscriptions: subscriptions.serviceIDs || [],
    success: postSuccess,
    error
});

const mapDispatchToProps = { addCompanyPermissions };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InviteCompanyFormContainer)
);
