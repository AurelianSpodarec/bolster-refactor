import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import EnquiryDetails from '../presentational/EnquiryDetails';

class EnquiryDetailsContainer extends Component {
    render() {
        const { isFetching, fetchingError, enquiry } = this.props;
        return (
            <BlockContainer
                isFetching={isFetching}
                error={fetchingError}
                isEmpty={!enquiry.id}
            >
                <EnquiryDetails enquiry={enquiry} />
            </BlockContainer>
        );
    }
}
const mapStateToProps = ({ enquiriesReducer }, { match }) => ({
    enquiry: enquiriesReducer.enquiries[match.params.id] || {},
    isFetching: enquiriesReducer.isFetching,
    fetchingError: enquiriesReducer.fetchingError
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(EnquiryDetailsContainer)
);
