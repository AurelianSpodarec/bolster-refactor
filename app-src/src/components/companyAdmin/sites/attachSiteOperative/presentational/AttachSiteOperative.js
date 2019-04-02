import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachSiteOperativeContainer from '../containers/AttachSiteOperativeContainer';

const AttachSiteOperative = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'Add operative' }]} />
        <AttachSiteOperativeContainer />
    </div>
);

export default AttachSiteOperative;
