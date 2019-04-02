import React from 'react';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import BuildingDocumentsTableContainer from '../containers/BuildingDocumentsTableContainer';
import BuildingFloorsTableContainer from '../containers/BuildingFloorsTableContainer';
import BuildingOperativeAddContainer from '../containers/BuildingOperativeAddContainer';
import BuildingInviteClientContainer from '../containers/BuildingInviteClientContainer';
import BuildingCompaniesAccessTableContainer from '../containers/BuildingCompaniesAccessTableContainer';
import BuildingPageHeaderContainer from '../containers/BuildingPageHeaderContainer';
import BreadcrumbContainer from 'components/companyAdmin/pins/singlePin/containers/BreadcrumbContainer';

const SingleBuilding = () => (
    <>
        <BreadcrumbContainer />
        <div className="size-lg-12">
            <BuildingPageHeaderContainer />
        </div>

        <div className="size-lg-8">
            <BuildingDetailsContainer />
        </div>

        <div className="size-lg-4">
            <BuildingDocumentsTableContainer />
        </div>

        <div className="size-lg-12">
            <BuildingFloorsTableContainer />
        </div>

        <div className="size-lg-4">
            <BuildingInviteClientContainer />
        </div>

        <div className="size-lg-4">
            <BuildingOperativeAddContainer />
        </div>

        <div className="size-lg-4">
            <BuildingCompaniesAccessTableContainer />
        </div>
    </>
);

export default SingleBuilding;
