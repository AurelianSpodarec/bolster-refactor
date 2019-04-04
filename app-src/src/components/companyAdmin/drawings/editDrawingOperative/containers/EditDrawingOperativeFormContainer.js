import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import EditDrawingOperativeForm from '../presentational/EditDrawingOperativeForm';
import fetchAllServices from 'actions/companyAdmin/services/async/fetchAllServices';
import editDrawingOperative from 'actions/companyAdmin/operatives/async/editDrawingOperative';

class EditDrawingOperativeFormContainer extends Component {
    state = {
        serviceIDs: [],
        services: []
    };

    render() {
        const { match, operative, isFetching } = this.props;
        const { services, serviceIDs } = this.state;
        const { id } = match.params;
        const backUrl = `/drawings/${id}`;
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
            isFetching
        } = this.props;
        const { id } = match.params;
        fetchOperativesForDrawing(id);
        if (services && !isFetching)
            this.setState({ services: this.getServicesForState(services) });
    }

    componentDidUpdate(prevProps) {
        const {
            isFetching,
            services,
            postSuccess,
            history,
            match
        } = this.props;
        if (!isFetching && prevProps.isFetching)
            this.setState({ services: this.getServicesForState(services) });

        if (postSuccess && !prevProps.postSuccess)
            history.push(`/drawings/${match.params.id}`);
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
        const { editDrawingOperative, match } = this.props;
        const { operativeID } = match.params;
        editDrawingOperative(operativeID, { serviceIDs });
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
            operativesReducer,
            servicesReducer,
            subscriptionsReducer
        }
    },
    ownProps
) => ({
    operative:
        operativesReducer.operatives[ownProps.match.params.operativeID] || null,
    isFetching: operativesReducer.isFetching || servicesReducer.isFetching,
    postSuccess: operativesReducer.postSuccess,
    services: servicesReducer.services || [],
    subscriptions: subscriptionsReducer.subscriptions.serviceIDs || []
});

const mapDispatchToProps = dispatch => ({
    fetchOperativesForDrawing: id => {
        dispatch(fetchOperativesForDrawing(id));
    },
    fetchAllServices: () => {
        dispatch(fetchAllServices);
    },
    editDrawingOperative: (id, body) => {
        dispatch(editDrawingOperative(id, body));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditDrawingOperativeFormContainer)
);
