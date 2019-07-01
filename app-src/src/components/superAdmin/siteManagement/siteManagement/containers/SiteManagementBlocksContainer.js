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
import selectHierarchy from 'actions/superAdmin/siteManagement/sync/selectHierarchy';
import selectOption from 'actions/superAdmin/siteManagement/sync/selectOption';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

class SiteManagementBlocksContainer extends Component {
    state = {
        moveFromCompany: null,
        moveToCompany: null
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
        const { companies, isFetching, error, selectedHierarchy } = this.props;

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
                    handleCompanyOneChange={this.handleCompanyOneChange}
                    handleHierarchyChange={this.handleHierarchyChange}
                    companies={this._getCompaniesList()}
                    hierarchies={this._getHierarchyOptions()}
                    selectedHierarchy={selectedHierarchy}
                />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        this.props.fetchAllCompanies();
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { moveFromCompany } = this.state;
        const {
            fetchHierarchiesForCompany,
            isPosting,
            postSuccess,
            postError
        } = this.props;

        if (prevState.moveFromCompany !== moveFromCompany)
            fetchHierarchiesForCompany(moveFromCompany);

        if (prevProps.isPosting && !isPosting && postSuccess) hideModal();
        showModal(SUCCESS_MODAL, {
            message: 'The move was successful!'
        });

        if (prevProps.isPosting && !isPosting && postError) hideModal();
        showModal(ERROR_MODAL, {
            title: 'Error',
            message: postError
        });
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

    handleCompanyOneChange = (name, value) => {
        this.setState({
            [name]: value
        });

        this.props.selectOption(null);
    };

    handleHierarchyChange = (name, value) => {
        this.props.selectHierarchy(value);
        this.props.selectOption(null);
    };
}

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { companies, isFetching, error },
        siteManagementReducer: {
            selectedHierarchy,
            isPosting,
            postSuccess,
            error: postError
        }
    }
}) => ({
    companies,
    isFetching,
    error,
    selectedHierarchy,
    isPosting,
    postSuccess,
    postError
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
    },
    selectHierarchy: value => {
        dispatch(selectHierarchy(value));
    },
    selectOption: value => {
        dispatch(selectOption(value));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteManagementBlocksContainer);
