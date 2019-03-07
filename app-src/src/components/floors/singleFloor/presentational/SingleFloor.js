import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import FloorDocumentsTableContainer from '../containers/FloorDocumentsTableContainer';
import FloorDrawingsTableContainer from '../containers/FloorDrawingsTableContainer';
import FloorOperativesTableContainer from '../containers/FloorOperativesTableContainer';
import FloorClientsTableContainer from '../containers/FloorClientsTableContainer';
import FloorCompaniesAccessTableContainer from '../containers/FloorCompaniesAccessTableContainer';

const Floor = () => (
    <div className="size-lg-12">
        <Block containerClass="size-lg-8" contentClass="site-details">
            <FloorDetailsContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <FloorDocumentsTableContainer />
        </Block>

        <Block>
            <FloorDrawingsTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <FloorClientsTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <FloorOperativesTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <FloorCompaniesAccessTableContainer />
        </Block>
    </div>
);

export default Floor;
