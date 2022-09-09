import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import fetchSingleContactSubmission from 'actions/superAdmin/contactSubmissions/async/fetchSingleContactSubmission';

import SingleContactSubmission from '../presentational/SingleContactSubmission';

const SingleContactSubmissionContainer = ({ fetchSingleContactSubmission, id }) => {
    useEffect(() => {
        fetchSingleContactSubmission(id);
    }, []);

    return <SingleContactSubmission />;
};

const mapDispatchToProps = { fetchSingleContactSubmission };

export default connect(
    (_, { match }) => ({ id: match.params.id }),
    mapDispatchToProps,
)(SingleContactSubmissionContainer);
