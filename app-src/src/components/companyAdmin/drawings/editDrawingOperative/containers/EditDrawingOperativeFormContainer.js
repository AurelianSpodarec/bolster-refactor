import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import EditDrawingOperativeForm from '../presentational/EditDrawingOperativeForm';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import editDrawingOperative from 'actions/companyAdmin/operatives/async/editDrawingOperative';
import fetchCompanyPermissions from 'actions/companyAdmin/companiesPermissions/async/fetchCompanyPermissions';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

class EditDrawingOperativeFormContainer extends Component {
    state = {
        serviceIDs: [],
        services: [],
    };

    render() {
        const { match, operative, isFetching } = this.props;
        const { services, serviceIDs } = this.state;
        const { id } = match.params;
        const backUrl = `/company/drawings/${id}`;
        return (
            <EditDrawingOperativeForm
                operative={operative}
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
            fetchOperativesForDrawing,
            match,
            services,
            isFetching,
            operative,
            fetchCompanyPermissions,
        } = this.props;
        const { id } = match.params;
        fetchOperativesForDrawing(id);

        fetchCompanyPermissions(HIERARCHY_IDS.DRAWING, id);
        if (services && operative && !isFetching) {
            const serviceIDs = operative.serviceIDs.map(id => String(id));
            this.setState({
                services: this.getServicesForState(services),
                serviceIDs,
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { isFetching, services, postSuccess, history, match, operative } = this.props;
        if (!isFetching && prevProps.isFetching && operative) {
            const serviceIDs = operative.serviceIDs.map(id => String(id));
            this.setState({
                services: this.getServicesForState(services),
                serviceIDs,
            });
        }
        if (postSuccess && !prevProps.postSuccess)
            history.push(`/company/drawings/${match.params.id}`);
    }

    getServicesForState = services => {
        const { companyPermissions, companyID } = this.props;
        const relevantPermissions = companyPermissions.filter(perm => perm.companyID === companyID);

        return Object.values(services).reduce((acc, { id, name }) => {
            const hasSub = this.props.subscriptions.includes(id);
            const hasPerm = relevantPermissions.find(
                perm => perm.serviceID === id || perm.serviceID === null,
            );
            console.log({ relevantPermissions, companyID, hasSub, hasPerm });
            acc.push({
                value: id,
                text: name,
                disabled: !(hasSub && hasPerm),
            });
            return acc;
        }, []);
    };

    handleSubmit = e => {
        e.preventDefault();
        const { serviceIDs } = this.state;
        const { editDrawingOperative, match } = this.props;
        const { operativeID } = match.params;
        editDrawingOperative(operativeID, { serviceIDs });
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
    isFetching: operativesReducer.isFetching || servicesReducer.isFetching,
    postSuccess: operativesReducer.postSuccess,
    services: servicesReducer.services || [],
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || [],
    companyPermissions: Object.values(companyPermissions),
    companyID,
});

const mapDispatchToProps = {
    fetchOperativesForDrawing,
    fetchAllServices,
    editDrawingOperative,
    fetchCompanyPermissions,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditDrawingOperativeFormContainer),
);
