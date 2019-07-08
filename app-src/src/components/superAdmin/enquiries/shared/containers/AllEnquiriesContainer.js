import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllEnquiries from 'actions/superAdmin/enquiries/async/fetchAllEnquiries';
import AllEnquiries from '../presentational/AllEnquiries';

class AllEnquiriesContainer extends Component {
    render = () => <AllEnquiries />;

    componentDidMount = () => this.props.fetchAllEnquiries();
}

const mapDispatchToProps = { fetchAllEnquiries };

export default connect(
    null,
    mapDispatchToProps
)(AllEnquiriesContainer);
