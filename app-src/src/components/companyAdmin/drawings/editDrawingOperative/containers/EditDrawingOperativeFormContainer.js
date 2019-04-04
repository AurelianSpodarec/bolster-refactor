import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fetchOperativesForDrawing from 'actions/companyAdmin/operatives/async/fetchOperativesForDrawing';
import Loading from 'components/shared/generic/misc/presentational/Loading';
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
        const { id: documentID, operativeID } = match;
        return (
            <EditDrawingOperativeForm
                operative={operative}
                handleSubmit={this.handleSubmit}
                handleMultiSelect={this.handleMultiselect}
                services={services}
                serviceIDs={serviceIDs}
                isFetching={isFetching}
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
        const { id: documentID } = match.params;
        fetchOperativesForDrawing(documentID);
        if (services && !isFetching)
            this.setState({ services: this.getServicesForState(services) });
    }

    componentDidUpdate(prevProps) {
        const { isFetching, services } = this.props;
        if (!isFetching && prevProps.isFetching)
            this.setState({ services: this.getServicesForState(services) });
    }

    getServicesForState = services =>
        Object.values(services).reduce((acc, { id, name }) => {
            acc.push({
                value: id,
                text: name,
                disabled: false
                // disabled: !this.props.subscriptions.includes(id)
            });
            return acc;
        }, []);

    handleSubmit = () => {
        const { editDrawingOperative } = this.props;
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
    services: servicesReducer.services || [],
    subscriptions: subscriptionsReducer.subscriptions || []
});

const mapDispatchToProps = dispatch => ({
    fetchOperativesForDrawing: id => {
        dispatch(fetchOperativesForDrawing(id));
    },
    fetchAllServices: () => {
        dispatch(fetchAllServices);
    },
    editDrawingOperative: id => {
        dispatch(editDrawingOperative(id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditDrawingOperativeFormContainer)
);
