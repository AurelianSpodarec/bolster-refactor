import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';

import PrivacyPolicy from '../presentational/PrivacyPolicy';

const PrivacyPolicyContainer = ({ fetchTerms, privacy, fetchError, isFetching }) => {
    useEffect(() => {
        fetchTerms();
    }, []);

    return <PrivacyPolicy privacy={privacy} error={fetchError} isFetching={isFetching} />;
};

const mapStateToProps = ({ shared: { legalDocumentsReducer: { docs: { privacy }, fetchError, isFetching } } }) => ({
    privacy: privacy || '',
    fetchError,
    isFetching,
});

const mapDispatchToProps = { fetchTerms };

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyContainer);
