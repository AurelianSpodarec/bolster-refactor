import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeadquartersCompaniesTable from '../presentational/HeadquartersCompaniesTable';

class HeadquartersCompaniesTableContainer extends Component {
    render() {
        const headers = ['name', 'something'];
        return (
            <HeadquartersCompaniesTable
                companies={this.props.companies}
                headers={headers}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        headquartersReducer: { companies }
    }
}) => ({
    companies
});

export default connect(mapStateToProps)(HeadquartersCompaniesTableContainer);
