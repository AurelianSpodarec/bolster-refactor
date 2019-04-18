import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllHeadquartersCompanies from 'actions/companyAdmin/headquarters/fetchAllHeadquartersCompanies';
import HeadquartersCompanies from '../presentational/HeadquartersCompanies';

class HeadquartersCompaniesContainer extends Component {
    render = () => <HeadquartersCompanies />;

    componentDidMount = () => this.props.fetchAllHeadquartersCompanies();
}

const mapStateToProps = ({
    companyAdmin: {
        headquartersReducer: { companies }
    }
}) => ({ companies });

const mapDispatchToProps = dispatch => ({
    fetchAllHeadquartersCompanies: () =>
        dispatch(fetchAllHeadquartersCompanies())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadquartersCompaniesContainer);
