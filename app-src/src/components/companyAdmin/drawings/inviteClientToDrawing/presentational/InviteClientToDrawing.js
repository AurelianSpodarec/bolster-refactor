import React from 'react';

import InviteClientToDrawingFormContainer from '../containers/InviteClientToDrawingFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const InviteClientToDrawing = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Client">
            <BackButtonContainer />
        </PageHeading>
        <InviteClientToDrawingFormContainer />
    </>
);

export default InviteClientToDrawing;
