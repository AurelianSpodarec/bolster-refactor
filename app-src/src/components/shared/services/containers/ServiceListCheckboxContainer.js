import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

// ! sort out fetch services

class ServiceCheckboxListContainer extends Component {
    render() {
        const {
            checkedServices,
            isFetching,
            error,
            handleMultiselect
        } = this.props;
        return (
            <CheckboxListContainer
                handleMultiselect={handleMultiselect}
                isFetching={isFetching}
                error={error}
                items={checkedServices}
            />
        );
    }
    componentDidMount() {
        // const { fetchServices } = this.props;
        // fetchServices();
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
