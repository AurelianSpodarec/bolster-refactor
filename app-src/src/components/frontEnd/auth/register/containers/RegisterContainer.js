import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchAuthAreaText from 'actions/frontEnd/auth/fetchAuthAreaText';
import Register from '../presentational/Register';

const RegisterContainer = ({ fetchAuthAreaText, auth, isFetching, error }) => {
    const { registerText } = auth;
    useEffect(() => {
        fetchAuthAreaText();
    }, []);

    return <Register registerText={registerText} isFetching={isFetching} error={error} />;
};

const mapStateToProps = ({
    frontEnd: {
        authReducer: { auth, error, isFetching },
    },
}) => ({
    auth,
    isFetching,
    error,
});
const mapDispatchToProps = { fetchAuthAreaText };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
