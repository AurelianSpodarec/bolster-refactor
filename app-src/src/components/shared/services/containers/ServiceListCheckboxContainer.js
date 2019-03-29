import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

// ! sort out fetch services

class ServiceCheckboxListContainer extends Component {
    render() {
        const { services, isFetching, error } = this.props;
        return (
            <CheckboxListContainer
                isFetching={isFetching}
                error={error}
                items={[
                    { text: '##fire##', value: '##fire##' },
                    { text: '##water##', value: '##water##' },
                    { text: '##earth##', value: '##earth##' },
                    { text: '##air##', value: '##air##' },
                    { text: '##heart##', value: '##heart##' }
                ]}
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
