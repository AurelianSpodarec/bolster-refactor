import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SingleFloorHeaderContainer from '../containers/SingleFloorHeaderContainer';
import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import FloorDocumentsTableContainer from '../containers/FloorDocumentsTableContainer';
import FloorDrawingsTableContainer from '../containers/FloorDrawingsTableContainer';
import FloorOperativesTableContainer from '../containers/FloorOperativesTableContainer';
import FloorClientsTableContainer from '../containers/FloorClientsTableContainer';
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
            <FloorClientsTableContainer />
        </div>

        <div className="size-lg-4">
            <FloorOperativesTableContainer />
        </div>

        <div className="size-lg-4">
            <FloorCompaniesAccessTableContainer />
        </div>
    </div>
);

export default Floor;
