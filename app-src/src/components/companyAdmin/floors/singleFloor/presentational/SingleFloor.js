import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SingleFloorHeaderContainer from '../containers/SingleFloorHeaderContainer';
import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import FloorDocumentsTableContainer from '../containers/FloorDocumentsTableContainer';
import FloorDrawingsTableContainer from '../containers/FloorDrawingsTableContainer';
import FloorOperativeAddContainer from '../containers/FloorOperativeAddContainer';
import FloorInviteClientContainer from '../containers/FloorInviteClientContainer';
import FloorCompaniesAccessTableContainer from '../containers/FloorCompaniesAccessTableContainer';

const Floor = () => (
    <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'floors' }, { text: 'floor' }]} />
        <div className="size-lg-12">
            <SingleFloorHeaderContainer />
        </div>
        <div className="size-lg-8">
            <FloorDetailsContainer />
        </div>

        <div className="size-lg-4">
            <FloorDocumentsTableContainer />
        </div>

        <div className="size-lg-12">
            <FloorDrawingsTableContainer />
        </div>

        <div className="size-lg-4">
            <FloorInviteClientContainer />
        </div>

        <div className="size-lg-4">
            <FloorOperativeAddContainer />
        </div>

        <div className="size-lg-4">
            <FloorCompaniesAccessTableContainer />
        </div>
    </div>
);

export default Floor;
