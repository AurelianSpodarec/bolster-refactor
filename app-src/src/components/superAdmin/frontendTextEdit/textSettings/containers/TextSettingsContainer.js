import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TextSettings from '../presentational/TextSettings';
import fetchFrontendText from 'actions/superAdmin/frontendSite/textSettings/async/fetchFrontendText';

const TextSettingsContainer = ({ frontendText, fetchFrontendText }) => {
    const { loginText, registerText } = frontendText;

    useEffect(() => {
        fetchFrontendText();
    }, []);

    return <TextSettings loginText={loginText} registerText={registerText} />;
};

const mapStateToProps = ({
    superAdmin: {
        frontendTextSettingsReducer: { frontendText, isFetching, postSuccess },
    },
}) => ({
    isFetching,
    frontendText,
    postSuccess,
});

const mapDispatchToProps = { fetchFrontendText };

export default connect(mapStateToProps, mapDispatchToProps)(TextSettingsContainer);
