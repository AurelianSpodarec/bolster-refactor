import React from 'react';

import RegisterFormContainer from '../containers/RegisterFormContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const Register = () => (
    <div className="auth size-lg-12">
        <PageHeading title="Register" />

        <RegisterFormContainer />
    </div>
);

export default Register;
