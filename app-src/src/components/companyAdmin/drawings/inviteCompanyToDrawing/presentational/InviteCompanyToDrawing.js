import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import InviteCompanyToDrawingContainer from '../containers/InviteCompanyToDrawingContainer';

const InviteCompanyToDrawing = () => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <InviteCompanyToDrawingContainer />
    </div>
);

export default InviteCompanyToDrawing;
