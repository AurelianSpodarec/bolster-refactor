import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import fetchAllContactSubmissions from 'actions/superAdmin/contactSubmissions/async/fetchAllContactSubmissions';
import SingleContactSubmission from '../presentational/SingleContactSubmission';

const SingleContactSubmissionContainer = ({ fetchSingleContactSubmission, id }) => {
    useEffect(() => {
        console.log('inside SingleContactSubmissionContainer');
        fetchSingleContactSubmission(id);
    }, []);

    return <SingleContactSubmission />;
};

const mapDispatchToProps = dispatch => ({
    fetchSingleContactSubmission: () => {
        dispatch(fetchAllContactSubmissions());
    },
});

export default connect(
    (_, { match }) => ({ id: match.params.id }),
    mapDispatchToProps,
)(SingleContactSubmissionContainer);
