import React from 'react';

import LoginFormContainer from '../containers/LoginFormContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Login = () => (
    <div className="auth size-lg-12">
        <PageHeading title="Log In" />
        <BlockContainer>
            <LoginFormContainer />
        </BlockContainer>
    </div>
);

export default Login;
