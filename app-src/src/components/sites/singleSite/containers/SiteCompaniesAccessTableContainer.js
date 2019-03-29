import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class CompaniesAccessTableContainer extends Component {
    render() {
        const { state, props } = this;

        return (
            <BlockContainer>
                <CompaniesAccessTable
                    companies={props.site.permissions}
                    parentId={props.site.id}
                    isEmpty={!props.site.id}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ sitesReducer, companiesReducer }, { match }) => ({
    site: sitesReducer.sites[match.params.id] || {},
    companies: companiesReducer.companies,
    isFetching: companiesReducer.isFetching,
    error: companiesReducer.error
});

export default withRouter(
    connect(mapStateToProps)(CompaniesAccessTableContainer)
);
