import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';

import Terms from '../presentational/Ts&Cs';

const TermsContainer = ({ fetchTerms, terms, privacy, eula, fetchError, isFetching }) => {
    useEffect(() => {
        fetchTerms();
    }, []);

    return (
        <Terms
            terms={terms}
            privacy={privacy}
            eula={eula}
            error={fetchError}
            isFetching={isFetching}
        />
    );
};

const mapStateToProps = ({
    shared: {
        legalDocumentsReducer: {
            docs: { terms, eula, privacy },
            fetchError,
            isFetching,
        },
    },
}) => ({
    terms: terms || '',
    eula: eula || '',
    privacy: privacy || '',
    fetchError,
    isFetching,
});

const mapDispatchToProps = { fetchTerms };

export default connect(mapStateToProps, mapDispatchToProps)(TermsContainer);
