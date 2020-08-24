import React from 'react';
import { Link } from 'react-router-dom';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const ActivityLog = () => (
    <>
        <PageHeading title="Activity Log" withBackButton>
            <Link className="button yellow" to="/company/activity-log/edit-settings">
                <i className="far fa-pencil" />
                Edit Settings
            </Link>
        </PageHeading>

        <BlockContainer heading="Activity Log"></BlockContainer>
    </>
);

export default ActivityLog;
