import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeadquartersCompanyListItem from '../presentational/HeadquartersCompanyListItem';
import reissueToken from 'actions/shared/auth/async/reissueToken';

class HeadquartersCompanyListItemContainer extends Component {
    render() {
        const { company } = this.props;
        return (
            <HeadquartersCompanyListItem
                company={company}
                handleImpersonate={this.handleImpersonate}
            />
        );
    }

    handleImpersonate = () => {
        const {
            company: { id },
            reissueToken
        } = this.props;
        reissueToken(id);
    };
}

const mapDispatchToProps = dispatch => ({
    reissueToken: companyID => dispatch(reissueToken(companyID))
});

export default connect(
    null,
    mapDispatchToProps
)(HeadquartersCompanyListItemContainer);
