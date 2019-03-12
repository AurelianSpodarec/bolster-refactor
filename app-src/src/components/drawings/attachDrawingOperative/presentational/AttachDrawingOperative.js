import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDrawingOperativeFormContainer from '../containers/AttachDrawingOperativeFormContainer';

const AttachDrawingOperative = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachDrawingOperativeFormContainer />
    </div>
);

export default AttachDrawingOperative;
