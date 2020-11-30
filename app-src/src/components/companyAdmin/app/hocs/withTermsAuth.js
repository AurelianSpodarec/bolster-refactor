import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';

import Error from 'components/shared/generic/misc/presentational/Error';
import { isEmpty } from 'lodash';
import Block from 'components/shared/generic/block/presentational/Block';
import AgreeToTerms from 'components/companyAdmin/agreeToTerms/AgreeToTerms';

function withTermsAuth(ProtectedComponent) {
    const WithTermsAuth = ({
        fetchTerms,
        termsExists,
        terms: { copy, publishedOn },
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

        if (termsExists && (!termsAcceptedOn || new Date(publishedOn) > new Date(termsAcceptedOn)))
            return <AgreeToTerms copy={copy} />;

        return <ProtectedComponent {...props} />;
    };

    const mapState = ({
        companyAdmin: { companySettingsReducer },
        shared: { legalDocumentsReducer },
    }) => ({
        terms: legalDocumentsReducer.docs,
        fetchSuccess: legalDocumentsReducer.fetchSuccess,
        fetchError: legalDocumentsReducer.fetchError,
        hasFetchedCompany: !isEmpty(companySettingsReducer.companySettings),
        termsExists: !isEmpty(legalDocumentsReducer.terms),
        termsAcceptedOn: companySettingsReducer.companySettings.termsAcceptedOn,
    });

    const mapDispatch = { fetchTerms };

    return connect(mapState, mapDispatch)(WithTermsAuth);
}

function ErrorBlock({ children }) {
    return (
        <Block>
            <Error>{children}</Error>
        </Block>
    );
}

export default withTermsAuth;
