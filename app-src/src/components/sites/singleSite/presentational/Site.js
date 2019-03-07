import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import DocumentsTableContainer from '../containers/DocumentsTableContainer';
import BuildingsTableContainer from '../containers/BuildingsTableContainer';
import OperativesTableContainer from '../containers/OperativesTableContainer';
import ClientsTableContainer from '../containers/ClientsTableContainer';
import CompaniesAccessTableContainer from '../containers/CompaniesAccessTableContainer';

const Site = () => (
    <div className="size-lg-12">
        <Block containerClass="size-lg-8" contentClass="site-details">
            <SiteDetailsContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <DocumentsTableContainer />
        </Block>

        <Block>
            <BuildingsTableContainer />
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

export default Site;
