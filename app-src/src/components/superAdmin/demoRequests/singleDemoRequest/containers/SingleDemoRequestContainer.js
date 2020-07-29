import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllDemoRequests from 'actions/superAdmin/demoRequests/async/fetchAllDemoRequests';
import SingleDemoRequest from '../presentational/SingleDemoRequest';

class SingleDemoRequestContainer extends Component {
    render = () => <SingleDemoRequest />;

    componentDidMount() {
        const { fetchSingleDemoRequest, id } = this.props;
        fetchSingleDemoRequest(id);
    }
}

const mapDispatchToProps = dispatch => ({
    fetchSingleDemoRequest: () => {
        dispatch(fetchAllDemoRequests());
    },
});

export default connect(
    (_, { match }) => ({ demoRequestID: match.params.id }),
    mapDispatchToProps,
)(SingleDemoRequestContainer);
