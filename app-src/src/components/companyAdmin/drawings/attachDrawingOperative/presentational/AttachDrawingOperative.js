import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDrawingOperativecontainer from '../containers/AttachDrawingOperativeContainer';

const AttachDrawingOperative = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachDrawingOperativecontainer />
    </>
);

export default AttachDrawingOperative;
