import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllEnquiries from 'actions/enquiries/async/fetchAllEnquiries';
import SingleEnquiry from '../presentational/SingleEnquiry';

class SingleEnquiryContainer extends Component {
    render = () => <SingleEnquiry />;

    componentDidMount() {
        const { fetchSingleEnquiry, id } = this.props;
        fetchSingleEnquiry(id);
    }
}

// ! this needs changing when the api is available
const mapDispatchToProps = dispatch => ({
    fetchSingleEnquiry: () => {
        dispatch(fetchAllEnquiries());
    }
});

export default connect(
    (_, { match }) => ({ enquiryID: match.params.id }),
    mapDispatchToProps
)(SingleEnquiryContainer);
