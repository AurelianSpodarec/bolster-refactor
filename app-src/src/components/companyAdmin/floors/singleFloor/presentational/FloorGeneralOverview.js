import React from 'react';
import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import FloorDocumentsTableContainer from '../containers/FloorDocumentsTableContainer';
import FloorDrawingsTableContainer from '../containers/FloorDrawingsTableContainer';
import FloorOperativeAddContainer from '../containers/FloorOperativeAddContainer';
import FloorInviteClientContainer from '../containers/FloorInviteClientContainer';
import FloorCompaniesAccessTableContainer from '../containers/FloorCompaniesAccessTableContainer';

const FloorGeneralOverview = () => (
    <>
        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-8">
                <FloorDetailsContainer />
            </div>

            <div className="flex-item size-lg-4">
                <FloorDocumentsTableContainer />
            </div>
        </div>

        <div className="size-lg-12">
            <FloorDrawingsTableContainer />
        </div>
        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-4">
                <FloorInviteClientContainer />
            </div>

            <div className="flex-item size-lg-4">
                <FloorOperativeAddContainer />
            </div>

            <div className="flex-item size-lg-4">
                <FloorCompaniesAccessTableContainer />
            </div>
        </div>
    </>
);

export default FloorGeneralOverview;
