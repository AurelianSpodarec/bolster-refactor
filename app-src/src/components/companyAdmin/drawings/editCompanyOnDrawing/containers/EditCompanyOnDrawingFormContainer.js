import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchCompaniesPermissions from 'actions/companyAdmin/companies/async/fetchCompanyPermissions';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import EditCompanyOnDrawingForm from '../presentational/EditCompanyOnDrawingForm';

class EditCompanyOnDrawingFormContainer extends Component {
    state = {
        serviceIDs: [],
        services: []
    };

    render() {
        const { match, company, isFetching } = this.props;
        const { services, serviceIDs } = this.state;
        const { id } = match.params;
        const backUrl = `/company/drawings/${id}`;
        return (
            <EditCompanyOnDrawingForm
                company={company}
                handleSubmit={this.handleSubmit}
                handleMultiSelect={this.handleMultiselect}
                services={services}
                serviceIDs={serviceIDs}
                isFetching={isFetching}
                backUrl={backUrl}
            />
        );
    }
    componentDidMount() {
        const {
            fetchCompaniesPermissions,
            match,
            services,
            isFetching,
            company
        } = this.props;
        const { id } = match.params;
        fetchCompaniesPermissions('drawing', id);
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
        console.error('HERE!!!', company);

        if (!isFetching && prevProps.isFetching && company) {
            const serviceIDs = company.serviceIDs.map(id => String(id));
            this.setState({
                services: this.getServicesForState(services),
                serviceIDs
            });
        }
        if (postSuccess && !prevProps.postSuccess)
            history.push(`/company/drawings/${match.params.id}`);
    }

    getServicesForState = services =>
        console.log(services) ||
        Object.values(services).reduce((acc, { id, name }) => {
            acc.push({
                value: id,
                text: name,
                disabled: !this.props.subscriptions.includes(id)
            });
            return acc;
        }, []);

    //     handleSubmit = e => {
    //         e.preventDefault();
    //         const { serviceIDs } = this.state;
    //         const { editDrawingOperative, match } = this.props;
    //         const { operativeID } = match.params;
    //         editDrawingOperative(operativeID, { serviceIDs });
    //     };

    //     handleMultiselect = ({ target: { name, value } }) => {
    //         const checkedValues = this.state[name];
    //         const newValues = checkedValues.includes(value)
    //             ? checkedValues.filter(val => val !== value)
    //             : [...checkedValues, value];
    //         this.setState({ [name]: newValues });
    //     };
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
    isFetching: companiesReducer.isFetching || servicesReducer.isFetching,
    postSuccess: companiesReducer.postSuccess,
    services: servicesReducer.services || [],
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    id: ownProps.match.params.companyID
});

const mapDispatchToProps = dispatch => ({
    fetchCompaniesPermissions: (hierarchyType, hierarchyID) => {
        dispatch(fetchCompaniesPermissions(hierarchyType, hierarchyID));
    },
    fetchAllServices: () => {
        dispatch(fetchAllServices);
    }
    // editCompanyWithPermission: (id, body) => {
    //     dispatch(editCompanyWithPermission(id, body));
    // }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditCompanyOnDrawingFormContainer)
);
