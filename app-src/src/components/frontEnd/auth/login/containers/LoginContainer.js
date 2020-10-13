import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchAuthAreaText from 'actions/frontEnd/auth/fetchAuthAreaText';
import Login from '../presentational/Login';

const LoginContainer = ({ fetchAuthAreaText, auth, isFetching, error }) => {
    const { loginText } = auth;
    useEffect(() => {
        fetchAuthAreaText();
    }, []);

    return <Login loginText={loginText} isFetching={isFetching} error={error} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
