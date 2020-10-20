import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';

import Terms from '../presentational/Ts&Cs';

const TermsContainer = ({ fetchTerms, terms, fetchError, isFetching }) => {
    useEffect(() => {
        fetchTerms();
    }, []);

    return <Terms terms={terms} error={fetchError} isFetching={isFetching} />;
};

const mapStateToProps = ({ shared: { legalDocumentsReducer: { docs: { terms }, fetchError, isFetching } } }) => ({
    terms: terms || '',
    fetchError,
    isFetching,
});

const mapDispatchToProps = { fetchTerms };

export default connect(mapStateToProps, mapDispatchToProps)(TermsContainer);
