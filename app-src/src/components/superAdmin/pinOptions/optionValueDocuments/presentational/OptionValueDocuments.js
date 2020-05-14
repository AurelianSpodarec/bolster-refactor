import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const OptionValueDocuments = ({ name }) => (
    <>
        <PageHeading title={`${name} Documents`} withBackButton />
        <div>##this is the option value documents container##</div>
    </>
);

export default OptionValueDocuments;
