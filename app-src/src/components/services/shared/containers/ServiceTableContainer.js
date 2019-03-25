import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServiceTable from '../presentational/ServiceTable';
import fetchAllServices from 'actions/services/async/fetchAllServices';

class ServiceTableContainer extends Component {
    componentDidMount() {
        this.props.fetchAllServices();
    }
    render() {
        const { isFetching, error, services } = this.props;
        return (
            <ServiceTable
                headers={['Service name', '']}
                isFetching={isFetching}
                error={error}
                services={services}
            />
        );
    }
}

export default connect(
    ({ servicesReducer }) => ({
        isFetching: servicesReducer.isFetching,
        error: servicesReducer.error,
        services: servicesReducer.services
    }),
    dispatch => ({
        fetchAllServices: () => {
            dispatch(fetchAllServices());
        }
    })
)(ServiceTableContainer);
