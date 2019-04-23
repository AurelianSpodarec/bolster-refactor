import React from 'react';

import RegisterFormContainer from '../containers/RegisterFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Register = () => (
    <div className="auth size-lg-12">
        <PageHeading title="Register" />

        <RegisterFormContainer />
    </div>
);

export default Register;
