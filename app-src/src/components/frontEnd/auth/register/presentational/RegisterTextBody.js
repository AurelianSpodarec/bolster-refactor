import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';

const RegisterTextBody = ({ registerText, error, isFetching }) => {
    return (
        <BlockContainer noWhiteBackground error={error} isFetching={isFetching}>
            <p>{registerText}</p>
        </BlockContainer>
    );
};

export default RegisterTextBody;
