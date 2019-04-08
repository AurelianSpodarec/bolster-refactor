import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddPinHistory from '../presentational/AddPinHistory';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';

class AddPinHistoryContainer extends Component {
    render() {
        return <AddPinHistory />;
    }

    componentDidMount = () => {
        const { pinID, fetchSinglePin } = this.props;
        fetchSinglePin(pinID);
    };
}

const mapStateToProps = (_, { match: { params } }) => ({
    pinID: params.id
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: id => {
        dispatch(fetchSinglePin(id));
    }
});

const WithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPinHistoryContainer);

export default withRouter(WithRedux);
