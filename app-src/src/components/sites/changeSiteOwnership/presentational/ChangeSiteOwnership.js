import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import ChangeOwnershipFormContainer from '../containers/ChangeOwnershipFormContainer';

const ChangeSiteOwnership = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <ChangeOwnershipFormContainer />
    </div>
);

export default ChangeSiteOwnership;
