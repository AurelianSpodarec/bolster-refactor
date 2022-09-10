import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { pageMeta } from 'constants/frontEnd/meta';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';

import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';
// import TermsAndConditions from './TermsAndConditions';
import PageMeta from 'pages/public/shared/meta/presentational/PageMeta';
import PageHeading from '../generic/pageHeading/presentational/PageHeading';

const Terms = ({ fetchTerms }) => {
    useEffect(() => {
        fetchTerms();
    }, []);

    return (
        <>
            <PageMeta meta={pageMeta.terms} />
            <PageHeading leftChildren={true} title="Terms & Conditions">
                <BackButtonContainer />
            </PageHeading>
        </>
    );
};

const mapState = ({ shared: { legalDocumentsReducer } }) => ({
    terms: legalDocumentsReducer.docs.terms || {},
    eula: legalDocumentsReducer.docs.eula || {},
    privacy: legalDocumentsReducer.docs.privacy || {},
    docs: legalDocumentsReducer.docs,
    fetchSuccess: legalDocumentsReducer.fetchSuccess,
    fetchError: legalDocumentsReducer.fetchError,
});

const mapDispatch = { fetchTerms };

export default connect(mapState, mapDispatch)(Terms);
