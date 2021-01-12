import React from 'react';
import { connect } from 'react-redux';

import Login from '../presentational/Login';

const LoginContainer = () => {
    return <Login />;
};

export default connect(null, null)(LoginContainer);
