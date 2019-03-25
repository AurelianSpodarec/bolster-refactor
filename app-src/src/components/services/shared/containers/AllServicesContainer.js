import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllServices from 'actions/services/async/fetchAllServices';
import AllServices from '../presentational/AllServices';

class AllServicesContainer extends Component {
    componentDidMount() {
        this.props.fetchAllServices();
    }
    render() {
        return <AllServices />;
    }
}

export default connect(
    null,
    dispatch => ({
        fetchAllServices: () => {
            dispatch(fetchAllServices());
        }
    })
)(AllServicesContainer);
