import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import SingleCompany from '../presentational/SingleCompany';

class SingleCompanyContainer extends Component {
    render() {
        return <SingleCompany />;
    }

    componentDidMount = () => {
        const { companyID, fetchPageData } = this.props;
        fetchPageData(companyID);
    };
}

const mapStateToProps = (_, { match }) => ({
    companyID: match.params.id
});

const mapDispatchToProps = dispatch => ({
    fetchPageData: id => {
        dispatch(fetchSingleCompany(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleCompanyContainer);
