import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllBuildings from 'actions/buildings/async/fetchAllBuildings';
import fetchSingleSite from 'actions/sites/async/fetchSingleSite';
import fetchDocuments from 'actions/documents/async/fetchDocuments';
import fetchClients from 'actions/clients/async/fetchClients';
import fetchCompanies from 'actions/companies/async/fetchCompanies';
import fetchOperatives from 'actions/operatives/async/fetchOperatives';

import Block from 'components/shared/generic/block/presentational/Block';

import SiteDetailsContainer from '../containers/SiteDetailsContainer';
import SiteDocumentsTableContainer from '../containers/SiteDocumentsTableContainer';
import SiteBuildingsTableContainer from '../containers/SiteBuildingsTableContainer';
import SiteOperativesTableContainer from '../containers/SiteOperativesTableContainer';
import SiteClientsTableContainer from '../containers/SiteClientsTableContainer';
import SiteCompaniesAccessTableContainer from '../containers/SiteCompaniesAccessTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SitePageHeaderContainer from '../containers/SitePageHeaderContainer';


class SingleSiteContainer extends Component {
    render() {
        return   <div className="size-lg-12">
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />

        <SitePageHeaderContainer />

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
    </div>;
    }
    componentDidMount = () => {
        const {
            fetchAllBuildings,
            fetchSingleSite,
            fetchDocuments,
            fetchClients,
            fetchCompanies,
            fetchOperatives
        } = this.props;

        fetchAllBuildings();
        fetchSingleSite();
        fetchDocuments();
        fetchClients();
        fetchCompanies();
        fetchOperatives();
    };
}

//make all fetches needed and this will update our redux store.
const mapDispatchToProps = dispatch => ({
    fetchAllBuildings: () => {
        dispatch(fetchAllBuildings());
    },
    fetchSingleSite: () => {
        dispatch(fetchSingleSite());
    },
    fetchDocuments: () => {
        dispatch(fetchDocuments());
    },
    fetchClients: () => {
        dispatch(fetchClients());
    },
    fetchCompanies: () => {
        dispatch(fetchCompanies());
    },
    fetchOperatives: () => {
        dispatch(fetchOperatives());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SingleSiteContainer);
