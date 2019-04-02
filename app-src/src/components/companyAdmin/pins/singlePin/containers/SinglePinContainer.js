import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinHistories from 'actions/companyAdmin/pins/async/fetchPinHistories';
import fetchCustomFields from 'actions/companyAdmin/pins/async/fetchCustomFields';
import SinglePin from '../presentational/SinglePin';

class SinglePinContainer extends Component {
    render() {
        return <SinglePin />;
    }

    componentDidMount = () => {
        const {
            pinId,
            fetchSinglePin,
            fetchPinHistories,
            fetchCustomFields
        } = this.props;

        fetchSinglePin(pinId);
        fetchPinHistories(pinId);
        fetchCustomFields(pinId);
    };
}

const mapStateToProps = (_, { match }) => ({
    pinId: match.params['id']
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: id => {
        dispatch(fetchSinglePin(id));
    },
    fetchPinHistories: id => {
        dispatch(fetchPinHistories(id));
    },
    fetchCustomFields: id => {
        dispatch(fetchCustomFields(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinContainer);
