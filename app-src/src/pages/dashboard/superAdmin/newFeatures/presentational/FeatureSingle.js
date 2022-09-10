import React from 'react';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import Breadcrumb from 'components_DEPRECATED/shared/generic/breadcrumb/presentational/Breadcrumb';

import FeatureSingleDetailsContainer from '../containers/FeatureSingleDetailsContainer';

const FeatureSingle = () => (
    <>
        <PageHeading title="Recent Updates" withBackButton>
            <Breadcrumb
                breadcrumbs={[
                    { link: '/admin/new-features', text: 'List of New Features' },
                    { text: 'New Feature' },
                ]}
            />
        </PageHeading>

        <FeatureSingleDetailsContainer />
    </>
);

export default FeatureSingle;
