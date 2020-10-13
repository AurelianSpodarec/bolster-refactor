import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';

const LoginTextBody = ({ loginText, error, isFetching }) => {
    return (
        <BlockContainer noWhiteBackground error={error} isFetching={isFetching}>
            <p>{loginText}</p>
        </BlockContainer>
    );
};

export default LoginTextBody;
