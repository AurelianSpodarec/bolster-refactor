import React, { Component } from 'react';
import { connect } from 'react-redux';

import SiteManagementBlocks from '../presentational/SiteManagementBlocks';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import { isEmpty } from 'helpers/generic';

class SiteManagementBlocksContainer extends Component {
    render() {
        const { companies, isFetching, error } = this.props;

        return (
            <BlockContainer
                isFetching={isFetching}
                error={error}
                isEmpty={isEmpty(companies)}
                noWhiteBackground
            >
                <SiteManagementBlocks />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        this.props.fetchAllCompanies();
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
