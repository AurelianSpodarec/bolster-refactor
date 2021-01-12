import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TextSettings from '../presentational/TextSettings';
import fetchFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/fetchFrontendText';

const TextSettingsContainer = ({
    frontendText,
    fetchFrontendText,
    isFetching,
    error,
    lastFetchedDate,
}) => {
    const { loginText, registerText } = frontendText;

    useEffect(() => {
        if (!lastFetchedDate) {
            fetchFrontendText();
        } else {
            const diff = Date.now() - lastFetchedDate;

            if (diff > 100) {
                fetchFrontendText();
            }
        }
    }, []);

    return (
        <TextSettings
            loginText={loginText}
            registerText={registerText}
            isFetching={isFetching}
            error={error}
        />
    );
};

const mapStateToProps = ({
    superAdmin: {
        frontendTextSettingsReducer: { frontendText, error, isFetching, lastFetchedDate },
    },
}) => ({
    frontendText,
    error,
    isFetching,
    lastFetchedDate,
});

const mapDispatchToProps = { fetchFrontendText };

export default connect(mapStateToProps, mapDispatchToProps)(TextSettingsContainer);
