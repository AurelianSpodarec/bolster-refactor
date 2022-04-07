import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { PIN_OPTION_TYPES_LOOKUP } from 'constants/companyAdmin/enums';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const OptionDocuments = () => {
    const { optionID, setID, type } = useParams();

    const typeLink = PIN_OPTION_TYPES_LOOKUP[type];

    if (!typeLink) return <Redirect to="/company/pin-options" />;

    return (
        <>
            <PageHeading title={'##document name##'} withBackButton />

            <BlockContainer>
                <p>Documents here...</p>
            </BlockContainer>
        </>
    );
};

export default OptionDocuments;
