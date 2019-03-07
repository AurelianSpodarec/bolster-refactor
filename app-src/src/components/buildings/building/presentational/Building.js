import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import FloorsTableContainer from '../containers/FloorsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Building = () => (
    <div className="size-lg-12">
        <Block containerClass="size-lg-8" contentClass="site-details">
            <BuildingDetailsContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <DocumentsTableContainer />
        </Block>

        <Block>
            <FloorsTableContainer />
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

export default Building;
