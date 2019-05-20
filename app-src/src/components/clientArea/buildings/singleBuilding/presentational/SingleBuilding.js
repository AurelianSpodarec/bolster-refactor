import React from 'react';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import BuildingDocumentsTableContainer from '../containers/BuildingDocumentsTableContainer';
import BuildingFloorsTableContainer from '../containers/BuildingFloorsTableContainer';
import BuildingOperativeAddContainer from '../containers/BuildingOperativeAddContainer';
import BuildingInviteClientContainer from '../containers/BuildingInviteClientContainer';
import BuildingCompaniesAccessTableContainer from '../containers/BuildingCompaniesAccessTableContainer';
import BuildingPageHeaderContainer from '../containers/BuildingPageHeaderContainer';

const SingleBuilding = () => (
    <>
        <div className="size-lg-12">
            <BuildingPageHeaderContainer />
        </div>
        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-8">
                <BuildingDetailsContainer />
            </div>

            <div className="flex-item size-lg-4">
                <BuildingDocumentsTableContainer />
            </div>
        </div>
        <div className="size-lg-12">
            <BuildingFloorsTableContainer />
        </div>

        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-4">
                <BuildingInviteClientContainer />
            </div>

            <div className="flex-item size-lg-4">
                <BuildingOperativeAddContainer />
            </div>

            <div className="flex-item size-lg-4">
                <BuildingCompaniesAccessTableContainer />
            </div>
        </div>
    </>
);

export default SingleBuilding;
