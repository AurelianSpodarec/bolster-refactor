import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import BuildingDocumentsTableContainer from '../containers/BuildingDocumentsTableContainer';
import BuildingFloorsTableContainer from '../containers/BuildingFloorsTableContainer';
import BuildingOperativesTableContainer from '../containers/BuildingOperativesTableContainer';
import BuildingClientsTableContainer from '../containers/BuildingClientsTableContainer';
import BuildingCompaniesAccessTableContainer from '../containers/BuildingCompaniesAccessTableContainer';

const SingleBuilding = () => (
    <div className="size-lg-12">
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

        <Block containerClass="size-lg-4">
            <BuildingClientsTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <BuildingCompaniesAccessTableContainer />
        </Block>
    </div>
);

export default SingleBuilding;
