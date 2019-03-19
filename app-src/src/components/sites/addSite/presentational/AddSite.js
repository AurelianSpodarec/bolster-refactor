import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddSiteFormContainer from '../containers/AddSiteFormContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const AddSite = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Add site' }]} />
        <Block>
            <AddSiteFormContainer />
        </Block>
    </>
);

export default AddSite;
