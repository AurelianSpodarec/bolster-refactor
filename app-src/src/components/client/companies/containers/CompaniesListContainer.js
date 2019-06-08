import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompaniesList from '../presentational/CompaniesList';
import clientSelectCompany from 'actions/client/companies/sync/clientSelectCompany';

class CompanySelectionContainer extends Component {
    render = () => {
        const { companies } = this.props;

        return (
            <CompaniesList
                companies={companies}
                selectCompany={this.selectCompany}
            />
        );
    };

    selectCompany = companyID => {
        const { history, clientSelectCompany } = this.props;

        clientSelectCompany(companyID);
        history.push('/client');
    };
}

const mapStateToProps = ({
    client: {
        companiesReducer: { companies }
    }
}) => ({
    companies: Object.values(companies)
});

const mapDispatchToProps = dispatch => ({
    clientSelectCompany: id => {
        dispatch(clientSelectCompany(id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CompanySelectionContainer)
);
