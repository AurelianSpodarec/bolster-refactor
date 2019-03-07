import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import DrawingsTableContainer from '../containers/DrawingsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Floor = () => (
    <div className="size-lg-12">
        <Block containerClass="size-lg-8" contentClass="site-details">
            <FloorDetailsContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <DocumentsTableContainer />
        </Block>

        <Block>
            <DrawingsTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <ClientsTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <OperativesTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <CompaniesAccessTableContainer />
        </Block>
    </div>
);

export default Floor;
