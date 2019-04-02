import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class BuildingCompaniesAccessTableContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <CompaniesAccessTable
                    companies={{}}
                    parentId={props.building.id}
                    isEmpty={!props.building.id}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    { companyAdmin: { buildingsReducer, companiesReducer } },
    { match }
) => ({
    building: buildingsReducer.buildings[match.params.id] || {},
    isFetching: companiesReducer.isFetching,
    error: companiesReducer.error
});

export default withRouter(
    connect(mapStateToProps)(BuildingCompaniesAccessTableContainer)
);
