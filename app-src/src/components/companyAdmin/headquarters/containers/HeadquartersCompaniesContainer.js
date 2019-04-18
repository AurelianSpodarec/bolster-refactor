import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchAllHeadquartersCompanies from 'actions/companyAdmin/headquarters/async/fetchAllHeadquartersCompanies';
import HeadquartersCompanies from '../presentational/HeadquartersCompanies';
import reissueToken from 'actions/shared/auth/async/reissueToken';

class HeadquartersCompaniesContainer extends Component {
    render = () => (
        <HeadquartersCompanies
            handleCancelImpersonation={this.handleCancelImpersonation}
        />
    );
    handleCancelImpersonation = () => {
        const { reissueToken } = this.props;
        reissueToken();
    };
    componentDidMount = () => this.props.fetchAllHeadquartersCompanies();
}

const mapStateToProps = ({
    companyAdmin: {
        headquartersReducer: { companies }
    }
}) => ({ companies });

const mapDispatchToProps = dispatch => ({
    fetchAllHeadquartersCompanies: () =>
        dispatch(fetchAllHeadquartersCompanies()),
    reissueToken: () => dispatch(reissueToken())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadquartersCompaniesContainer);
