import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCompanyPermissionsForm from '../presentational/EditCompanyPermissionsForm';
import editCompanyPermissions from 'actions/companyAdmin/companiesPermissions/async/editCompanyPermissions';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { isEmpty } from 'helpers/generic';

class EditCompanyPermissionsFormContainer extends Component {
    state = {
        serviceIDs: [],
    };

    render() {
        const { serviceIDs } = this.state;
        const serviceOptions = this._getServicesOptions();
        const { error, hierarchyType, isFetching, companiesPermissions, redirectUrl } = this.props;
        const showMoreServicesMesssage = serviceOptions.some(option => option.disabled === true);

        return (
            <BlockContainer
                isFetching={isFetching}
                isEmpty={isEmpty(companiesPermissions)}
                error={error}
            >
                <EditCompanyPermissionsForm
                    {...this.state}
                    serviceOptions={serviceOptions}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    hierarchyType={hierarchyType}
                    showMoreServicesMesssage={showMoreServicesMesssage}
                    cancelURL={redirectUrl}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { success, history, redirectUrl, isFetching, fetchSuccess, companiesPermissions } =
            this.props;
        if (!prevProps.success && success) return history.replace(redirectUrl);

        if (prevProps.isFetching && !isFetching && fetchSuccess) {
            if (isEmpty(companiesPermissions)) return;

            const serviceIDs = companiesPermissions
                .filter(({ serviceID }) => serviceID)
                .map(({ serviceID }) => `${serviceID}`);

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
        const { serviceIDs } = this.state;
        const { hierarchyType, hierarchyID, editCompanyPermissions, companyID } = this.props;

        const postBody = {
            companyID,
            serviceIDs,
        };

        editCompanyPermissions(hierarchyType, hierarchyID, companyID, postBody);
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
    {
        match: {
            url,
            params: { id, companyID },
        },
    },
) => ({
    hierarchyID: id,
    companyID,
    redirectUrl: url.replace(`/edit-company/${companyID}`, ''),
    services: Object.values(services),
    subscriptions: subscriptions.serviceIDs || [],
    success: postSuccess,
    error,
    isFetching,
    fetchSuccess,
    companiesPermissions: Object.values(companiesPermissions),
});

const mapDispatchToProps = { editCompanyPermissions };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditCompanyPermissionsFormContainer),
);
