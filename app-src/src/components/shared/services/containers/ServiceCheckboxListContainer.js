import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServiceCheckboxList from '../presentational/ServiceCheckboxList';

class ServiceCheckboxListContainer extends Component {
    render() {
        const { services, isFetching, error } = this.props;
        return (
            <ServiceCheckboxList
                isFetching={isFetching}
                error={error}
                services={services}
            />
        );
    }
    componentDidMount() {
        const { fetchServices } = this.props;
        fetchServices();
    }
}

const mapStateToProps = state => ({
    // get services, relevant services from redux
    // map isfetching, error
});

const mapDispatchToProps = dispatch => ({
    // fetch services
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceCheckboxListContainer);
