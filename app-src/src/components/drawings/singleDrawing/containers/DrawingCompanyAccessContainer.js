import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesAccessTable from 'components/shared/companies/presentational/CompaniesAccessTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class DrawingCompanyAccessContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <CompaniesAccessTable
                    companies={props.drawing.permissions}
                    parentId={props.drawing.id}
                    isEmpty={!props.drawing.id}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({ drawingsReducer, companiesReducer }, { match }) => ({
    drawing: drawingsReducer.drawings[match.params.id] || {},
    isFetching: companiesReducer.isFetching,
    error: companiesReducer.error
});

export default withRouter(
    connect(mapStateToProps)(DrawingCompanyAccessContainer)
);
