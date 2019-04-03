import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteClientToDrawingFormContainer from '../containers/InviteClientToDrawingFormContainer';

const InviteClientToDrawing = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteClientToDrawingFormContainer />
    </>
);

export default InviteClientToDrawing;
