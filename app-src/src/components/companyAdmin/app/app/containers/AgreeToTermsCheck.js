import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { usePrevious } from 'helpers/hooks';
import { withRouter } from 'react-router-dom';

import fetchTerms from 'actions/shared/legalDocuments/fetchTerms';
import updateTermsCancelCount from 'actions/shared/legalDocuments/updateTermsCancelCount';

import Error from 'components/shared/generic/misc/presentational/Error';
import Block from 'components/shared/generic/block/presentational/Block';
import AgreeToTermsModal from 'components/companyAdmin/agreeToTerms/AgreeToTermsModal';

const AgreeToTermsCheck = ({
    fetchTerms,
    termsExists,
    terms,
    eula,
    privacy,
    termsAcceptedOn,
    fetchSuccess,
    hasFetchedCompany,
    fetchError,
    children,
    history,
    updateTermsCancelCount,
    jwtData,
}) => {
    const [modalClose, setModalClose] = useState(false);
    const { pathname } = history.location;
    const prevProps = usePrevious({ pathname });
    const isOwner = jwtData.companyUserType === 100;

    useEffect(() => {
        fetchTerms();
    }, []);

    useEffect(() => {
        if (pathname !== prevProps.pathname) {
            if (termsExists && (!termsAcceptedOn || new Date(maxDate) > new Date(termsAcceptedOn)))
                setModalClose(false);
        }
    }, [pathname, prevProps.pathname]);

    const handleClick = () => {
        setModalClose(true);
        updateTermsCancelCount();
    };

    if (fetchError) return <ErrorBlock>{fetchError}</ErrorBlock>;
    if (!fetchSuccess || !hasFetchedCompany) return null;

    var maxDate = getMaxDate([terms.publishedOn, eula.publishedOn, privacy.publishedOn]);
    if (
        isOwner &&
        termsExists &&
        !modalClose &&
        (!termsAcceptedOn || new Date(maxDate) > new Date(termsAcceptedOn))
    ) {
        return (
            <AgreeToTermsModal
                terms={terms}
                eula={eula}
                privacy={privacy}
                handleClick={handleClick}
            />
        );
    }
    return children;
};

const mapState = ({
    companyAdmin: { companySettingsReducer },
    shared: { legalDocumentsReducer, decodeJWTReducer },
}) => ({
    terms: legalDocumentsReducer.docs.terms || {},
    eula: legalDocumentsReducer.docs.eula || {},
    privacy: legalDocumentsReducer.docs.privacy || {},
    fetchSuccess: legalDocumentsReducer.fetchSuccess,
    fetchError: legalDocumentsReducer.fetchError,
    hasFetchedCompany: !!companySettingsReducer.companySettings.id,
    termsExists: !!legalDocumentsReducer.docs.terms,
    termsAcceptedOn: companySettingsReducer.companySettings.termsAcceptedOn,
    jwtData: decodeJWTReducer.jwtData,
});

const mapDispatch = { fetchTerms, updateTermsCancelCount };

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

export default withRouter(connect(mapState, mapDispatch)(AgreeToTermsCheck));
