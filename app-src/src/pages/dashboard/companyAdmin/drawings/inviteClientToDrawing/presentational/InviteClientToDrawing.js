import React from 'react';

import InviteClientToDrawingFormContainer from '../containers/InviteClientToDrawingFormContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const InviteClientToDrawing = () => (
    <>
        <PageHeading leftChildren={true} title="Invite Client" withBackButton />
        <InviteClientToDrawingFormContainer />
    </>
);

export default InviteClientToDrawing;
