import React from 'react';

import AttachDrawingOperativecontainer from '../containers/AttachDrawingOperativeContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const AttachDrawingOperative = () => (
    <>
        <PageHeading leftChildren={true} title="Attatch Operative">
            <BackButtonContainer />
        </PageHeading>
        <AttachDrawingOperativecontainer />
    </>
);

export default AttachDrawingOperative;
