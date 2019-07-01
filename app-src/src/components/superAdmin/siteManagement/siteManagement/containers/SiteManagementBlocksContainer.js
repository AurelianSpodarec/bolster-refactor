import React, { Component } from 'react';
import { connect } from 'react-redux';

import SiteManagementBlocks from '../presentational/SiteManagementBlocks';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import { isEmpty } from 'helpers/generic';

class SiteManagementBlocksContainer extends Component {
    state = {
        moveFromCompany: null,
        moveToCompany: null,
        moveFromHierarchy: null
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
        const hierarchyOptions = {
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

        return Object.values(hierarchyOptions).map(({ id, name }) => ({
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteManagementBlocksContainer);
