import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import BuildingDocumentsTableContainer from '../containers/BuildingDocumentsTableContainer';
import BuildingFloorsTableContainer from '../containers/BuildingFloorsTableContainer';
import BuildingOperativesTableContainer from '../containers/BuildingOperativesTableContainer';
import BuildingInviteClientContainer from '../containers/BuildingInviteClientContainer';
import BuildingCompaniesAccessTableContainer from '../containers/BuildingCompaniesAccessTableContainer';
import BuildingPageHeaderContainer from '../containers/BuildingPageHeaderContainer';
import BreadcrumbContainer from 'components/pins/singlePin/containers/BreadcrumbContainer';

const SingleBuilding = () => (
    <div className="size-lg-12">
        <BreadcrumbContainer />
        <div className="size-lg-12">
            <BuildingPageHeaderContainer />
        </div>

        <Block containerClass="size-lg-8" contentClass="site-details">
            <BuildingDetailsContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <BuildingDocumentsTableContainer />
        </Block>

        <Block>
            <BuildingFloorsTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <BuildingOperativesTableContainer />
        </Block>

        <div className="size-lg-4">
            <BuildingInviteClientContainer />
        </div>

        <Block containerClass="size-lg-4">
            <BuildingCompaniesAccessTableContainer />
        </Block>
    </div>
);

export default SingleBuilding;
