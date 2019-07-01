import React, { Component } from 'react';
import { connect } from 'react-redux';

import SiteManagementBlocks from '../presentational/SiteManagementBlocks';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import { isEmpty } from 'helpers/generic';
import fetchSitesForCompany from 'actions/superAdmin/siteManagement/async/fetchSitesForCompany';
import fetchBuildingsForCompany from 'actions/superAdmin/siteManagement/async/fetchBuildingsForCompany';
import fetchFloorsForCompany from 'actions/superAdmin/siteManagement/async/fetchFloorsForCompany';
import fetchDrawingsForCompany from 'actions/superAdmin/siteManagement/async/fetchDrawingsForCompany';

class SiteManagementBlocksContainer extends Component {
    state = {
        moveFromCompany: null,
        moveToCompany: null,
        moveFromHierarchy: null
    };

    hierarchyOptions = {
        2: {
            id: 2,
            name: 'Buildings'
        },
        3: {
            id: 3,
            name: 'Floors'
        },
        4: {
            id: 4,
            name: 'Drawings'
        }
    };

    render() {
        const { companies, isFetching, error } = this.props;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(companies)}
                noWhiteBackground
            >
                <SiteManagementBlocks
                    {...this.state}
                    handleChange={this.handleChange}
                    companies={this._getCompaniesList()}
                    hierarchies={this._getHierarchyOptions()}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        this.props.fetchAllCompanies();
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { moveFromCompany } = this.state;
        const { fetchHierarchiesForCompany } = this.props;

        if (prevState.moveFromCompany !== moveFromCompany)
            fetchHierarchiesForCompany(moveFromCompany);
    };

    _getCompaniesList = () => {
        const { companies } = this.props;

        return Object.values(companies).map(({ id, name }) => ({
            id,
            value: id,
            label: name,
            text: name
        }));
    };

    _getHierarchyOptions = () => {
        return Object.values(this.hierarchyOptions).map(({ id, name }) => ({
            value: id,
            label: name,
            text: name
        }));
    };

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };
}

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { companies, isFetching, error }
    }
}) => ({
    companies,
    isFetching,
    error
});

const mapDispatchToProps = dispatch => ({
    fetchAllCompanies: () => {
        dispatch(fetchAllCompanies());
    },
    fetchHierarchiesForCompany: companyID => {
        dispatch(fetchSitesForCompany(companyID));
        dispatch(fetchBuildingsForCompany(companyID));
        dispatch(fetchFloorsForCompany(companyID));
        dispatch(fetchDrawingsForCompany(companyID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteManagementBlocksContainer);
