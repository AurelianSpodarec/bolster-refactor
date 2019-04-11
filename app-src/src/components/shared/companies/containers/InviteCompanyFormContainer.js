import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InviteCompanyForm from '../presentational/InviteCompanyForm';
import addCompany from 'actions/companyAdmin/companiesPermissions/async/addCompanyPermissions';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class InviteCompanyFormContainer extends Component {
    state = {
        companyCode: '',
        serviceIDs: []
    };

    render() {
        const { serviceIDs } = this.state;
        const serviceOptions = this._getServicesOptions();
        const { error } = this.props;

        return (
            <BlockContainer error={error}>
                <InviteCompanyForm
                    {...this.state}
                    serviceOptions={serviceOptions}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleMultiselectChange={this.handleMultiselectChange}
                    handleSubmit={this.handleSubmit}
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

    handleChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleMultiselectChange = ({ target: { name, value } }) => {
        const checkedValues = this.state[name];
        const newValues = checkedValues.includes(value)
            ? checkedValues.filter(val => val !== value)
            : [...checkedValues, value];

        this.setState({ [name]: newValues });
    };

    handleSubmit = () => {
        const { companyCode, serviceIDs } = this.state;
        const { hierarchyType, hierarchyID, addCompany } = this.props;
        const postBody = {
            companyCode,
            serviceIDs
        };

        addCompany(hierarchyType, hierarchyID, postBody);
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

const mapDispatchToProps = dispatch => ({
    addCompany: (hierarchyType, hierarchyID, postBody) => {
        dispatch(addCompany(hierarchyType, hierarchyID, postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InviteCompanyFormContainer)
);
