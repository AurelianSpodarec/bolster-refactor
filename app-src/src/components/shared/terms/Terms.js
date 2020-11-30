import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import TermsAndConditions from './TermsAndConditions';

const Terms = ({ fetchTerms, terms, eula, privacy }) => {
    useEffect(() => {
        fetchTerms();
    }, []);

    return (
        <>
            <PageHeading leftChildren={true} title="Terms & Conditions">
                <BackButtonContainer />
            </PageHeading>
            <TermsAndConditions terms={terms} eula={eula} privacy={privacy} />
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
