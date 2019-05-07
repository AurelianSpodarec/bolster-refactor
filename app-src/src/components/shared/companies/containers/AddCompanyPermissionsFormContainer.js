import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddCompanyPermissionsForm from '../presentational/AddCompanyPermissionsForm';
import addCompany from 'actions/companyAdmin/companiesPermissions/async/addCompanyPermissions';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class AddCompanyPermissionsFormContainer extends Component {
    state = {
        serviceIDs: []
    };

    render() {
        const { serviceIDs } = this.state;
        const serviceOptions = this._getServicesOptions();
        const { error, companyID } = this.props;

        return (
            <BlockContainer error={error}>
                <AddCompanyPermissionsForm
                    {...this.state}
                    serviceOptions={serviceOptions}
                    checkedServices={serviceIDs}
                    handleChange={this.handleChange}
                    handleMultiselectChange={this.handleMultiselectChange}
                    handleSubmit={this.handleSubmit}
                    companyID={companyID}
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

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleMultiselect = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const { serviceIDs } = this.state;
        const {
            hierarchyType,
            hierarchyID,
            addCompany,
            companyID
        } = this.props;
        const postBody = {
            companyID,
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
    { match: { params, url } }
) => ({
    hierarchyID: params.id,
    services: Object.values(services),
    subscriptions: subscriptions.serviceIDs || [],
    success: postSuccess,
    error,
    companyID: params.companyID,
    redirectUrl: url.replace(`/add-permissions/${params.companyID}`, '')
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
    )(AddCompanyPermissionsFormContainer)
);
