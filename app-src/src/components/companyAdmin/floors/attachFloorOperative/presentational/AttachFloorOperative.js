import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachFloorOperativeContainer from '../containers/AttachFloorOperativeContainer';

const AttachFloorOperative = () => (
    <>
        <Breadcrumb
            breadcrumbs={[
                { text: '##floor name##' },
                { text: '##add operative##' }
            ]}
        />
        <AttachFloorOperativeContainer />
    </>
);

export default AttachFloorOperative;
