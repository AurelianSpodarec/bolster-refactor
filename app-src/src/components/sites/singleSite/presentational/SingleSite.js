import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import SiteDocumentsTableContainer from '../containers/SiteDocumentsTableContainer';
import SiteBuildingsTableContainer from '../containers/SiteBuildingsTableContainer';
import SiteOperativesTableContainer from '../containers/SiteOperativesTableContainer';
import SiteClientsTableContainer from '../containers/SiteClientsTableContainer';
import SiteCompaniesAccessTableContainer from '../containers/SiteCompaniesAccessTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const Site = () => (
    <div className="size-lg-12">
        <Breadcrumb />

        <Block containerClass="size-lg-8" contentClass="site-details">
            <SiteDetailsContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <SiteDocumentsTableContainer />
        </Block>

        <Block>
            <SiteBuildingsTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <SiteClientsTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <SiteOperativesTableContainer />
        </Block>

        <Block containerClass="size-lg-4">
            <SiteCompaniesAccessTableContainer />
        </Block>
    </div>
);

export default Site;
