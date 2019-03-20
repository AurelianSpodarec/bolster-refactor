import React, { Component } from 'react';
import { connect } from 'react-redux';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class CompaniesAccessTableContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <CompaniesAccessTable
                    companies={props.companies}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ companiesReducer }) => ({
    companies: Object.values(companiesReducer.companies),
    isFetching: companiesReducer.isFetching,
    error: companiesReducer.error
});

export default connect(mapStateToProps)(CompaniesAccessTableContainer);
