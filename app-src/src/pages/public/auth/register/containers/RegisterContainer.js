import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchAuthAreaText from 'actions/frontEnd/auth/fetchAuthAreaText';
import Register from '../presentational/Register';

const RegisterContainer = ({ fetchAuthAreaText, isFetching, error }) => {
    useEffect(() => {
        fetchAuthAreaText();
    }, []);

    return <Register isFetching={isFetching} error={error} />;
};

const mapStateToProps = ({
    frontEnd: {
        authReducer: { error, isFetching },
    },
}) => ({
    isFetching,
    error,
});
const mapDispatchToProps = { fetchAuthAreaText };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
