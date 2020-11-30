import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import PrivacyPolicy from './PrivacyPolicy';
import EULA from './EULA';
import TsAndCs from './TsAndCs';
import Helmet from 'components/frontEnd/shared/meta/presentational/Helmet';

const Terms = ({ fetchTerms, copy }) => {
    useEffect(() => {
        fetchTerms();
    }, []);

    return (
        <>
            <PageHeading leftChildren={true} title="Terms & Conditions">
                <BackButtonContainer />
            </PageHeading>
            <TsAndCs copy={copy} />
            <EULA />
            <PrivacyPolicy />
        </>
    );
};

const mapState = ({ shared: { legalDocumentsReducer } }) => ({
    copy: legalDocumentsReducer.terms.copy,
    fetchSuccess: legalDocumentsReducer.fetchSuccess,
    fetchError: legalDocumentsReducer.fetchError,
});

const mapDispatch = { fetchTerms };

export default connect(mapState, mapDispatch)(Terms);
