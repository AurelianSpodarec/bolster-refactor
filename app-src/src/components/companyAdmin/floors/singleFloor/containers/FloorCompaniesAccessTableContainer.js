import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class CompaniesAccessTableContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <CompaniesAccessTable
                    companies={props.floor.permissions}
                    isEmpty={!props.floor.id}
                    parentId={props.floor.id}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = (
    { companyAdmin: { floorsReducer, companiesReducer } },
    { match }
) => ({
    floor: floorsReducer.floors[match.params.id] || {},
    isFetching: companiesReducer.isFetching,
    error: companiesReducer.error
});

export default withRouter(
    connect(mapStateToProps)(CompaniesAccessTableContainer)
);
