import React from 'react';

import AttachDrawingOperativecontainer from '../containers/AttachDrawingOperativeContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AttachDrawingOperative = () => (
    <>
        <PageHeading
            leftChildren={true}
            title="Invite operative"
            withBackButton
        />
        <AttachDrawingOperativecontainer />
    </>
);

export default AttachDrawingOperative;
