import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editCompanyPermissions from 'actions/companyAdmin/companies/async/editCompanyPermissions';

import fetchCompaniesPermissions from 'actions/companyAdmin/companies/async/fetchCompanyPermissions';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import EditCompanyPermissionsForm from 'components/shared/companies/presentational/EditCompanyPermissionsForm';

class EditCompanyPermissionsOnBuildingFormContainer extends Component {
    state = {
        serviceIDs: [],
        services: []
    };

    render() {
        const { match, company, isFetching } = this.props;
        const { services, serviceIDs } = this.state;
        const { id } = match.params;
        const backUrl = `/company/buildings/${id}`;
        return (
            <EditCompanyPermissionsForm
                company={company}
                handleSubmit={this.handleSubmit}
                handleMultiSelect={this.handleMultiselect}
                services={services}
                serviceIDs={serviceIDs}
                isFetching={isFetching}
                backUrl={backUrl}
                type="Buildings"
            />
        );
    }
    componentDidMount() {
        const {
            fetchCompaniesPermissions,
            fetchAllServices,
            match,
            services,
            isFetching,
            company
        } = this.props;
        const { id } = match.params;
        fetchCompaniesPermissions('building', id).then(() => {
            fetchAllServices();
        });
        if (services && company && !isFetching) {
            const serviceIDs = company.serviceIDs.map(id => String(id));
            this.setState({
                services: this.getServicesForState(services),
                serviceIDs
            });
        }
    }

    componentDidUpdate(prevProps) {
        const {
            isFetching,
            services,
            postSuccess,
            history,
            match,
            company
        } = this.props;

        if (!isFetching && prevProps.isFetching && company) {
            const serviceIDs = company.serviceIDs.map(id => String(id));
            this.setState({
                services: this.getServicesForState(services),
                serviceIDs
            });
        }
        if (postSuccess && !prevProps.postSuccess)
            history.push(`/company/buildings/${match.params.id}`);
    }

    getServicesForState = services =>
        Object.values(services).reduce((acc, { id, name }) => {
            acc.push({
                value: id,
                text: name,
                disabled: !this.props.subscriptions.includes(id)
            });
            return acc;
        }, []);

    handleSubmit = e => {
        e.preventDefault();
        const { serviceIDs } = this.state;
        const { editCompanyPermissions, id } = this.props;
        editCompanyPermissions(id, { serviceIDs });
    };

    handleMultiselect = ({ target: { name, value } }) => {
        const checkedValues = this.state[name];
        const newValues = checkedValues.includes(value)
            ? checkedValues.filter(val => val !== value)
            : [...checkedValues, value];
        this.setState({ [name]: newValues });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            companiesReducer,
            servicesReducer,
            subscriptionsReducer
        }
    },
    ownProps
) => ({
    company:
        companiesReducer.companiesWithPermissions[
            ownProps.match.params.companyID
        ] || null,
    isFetching:
        companiesReducer.isFetching ||
        servicesReducer.isFetching ||
        subscriptionsReducer.isFetching,
    postSuccess: companiesReducer.postSuccess,
    services: servicesReducer.services || [],
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    id: ownProps.match.params.companyID
});

const mapDispatchToProps = dispatch => ({
    fetchCompaniesPermissions: (hierarchyType, hierarchyID) => {
        return dispatch(fetchCompaniesPermissions(hierarchyType, hierarchyID));
    },
    fetchAllServices: () => {
        return dispatch(fetchAllServices());
    },
    editCompanyPermissions: (hierarchicalID, body) => {
        dispatch(editCompanyPermissions(hierarchicalID, body));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditCompanyPermissionsOnBuildingFormContainer)
);
