import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';

import Error from 'components/shared/generic/misc/presentational/Error';
import { isEmpty } from 'lodash';
import Block from 'components/shared/generic/block/presentational/Block';
import AgreeToTermsModal from 'components/companyAdmin/agreeToTerms/AgreeToTermsModal';

function withTermsAuth(ProtectedComponent) {
    const WithTermsAuth = ({
        fetchTerms,
        termsExists,
        terms,
        eula,
        privacy,
        termsAcceptedOn,
        fetchSuccess,
        hasFetchedCompany,
        fetchError,
        ...props
    }) => {
        useEffect(() => {
            fetchTerms();
        }, []);

        if (fetchError) return <ErrorBlock>{fetchError}</ErrorBlock>;
        if (!fetchSuccess || !hasFetchedCompany) return null;

        var maxDate = getMaxDate([terms.publishedOn, eula.publishedOn, privacy.publishedOn]);
        if (termsExists && (!termsAcceptedOn || new Date(maxDate) > new Date(termsAcceptedOn)))
            return <AgreeToTermsModal terms={terms} eula={eula} privacy={privacy} />;

        return <ProtectedComponent {...props} />;
    };

    const mapState = ({
        companyAdmin: { companySettingsReducer },
        shared: { legalDocumentsReducer },
    }) => ({
        terms: legalDocumentsReducer.docs.terms || {},
        eula: legalDocumentsReducer.docs.eula || {},
        privacy: legalDocumentsReducer.docs.privacy || {},
        fetchSuccess: legalDocumentsReducer.fetchSuccess,
        fetchError: legalDocumentsReducer.fetchError,
        hasFetchedCompany: !!companySettingsReducer.companySettings.id,
        termsExists: !!legalDocumentsReducer.docs.terms,
        termsAcceptedOn: companySettingsReducer.companySettings.termsAcceptedOn,
    });

    const mapDispatch = { fetchTerms };

    return connect(mapState, mapDispatch)(WithTermsAuth);
}

function getMaxDate(dates) {
    return dates.reduce((a, b) => (new Date(a) > new Date(b) ? a : b));
}

function ErrorBlock({ children }) {
    return (
        <Block>
            <Error>{children}</Error>
        </Block>
    );
}

export default withTermsAuth;
