import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinTemplates from 'actions/companyAdmin/pins/async/fetchPinTemplates';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import SinglePin from '../presentational/SinglePin';

class SinglePinContainer extends Component {
    render = () => <SinglePin />;

    componentDidMount = () => {
        const { pinId, fetchSinglePinData } = this.props;
        fetchSinglePinData(pinId);
    };
}

const mapStateToProps = (_,
    { match: { params } }
) => ({
    pinId: params.id
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePinData: id => {
        dispatch(fetchSinglePin(id));
        dispatch(fetchPinTemplates(id));
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinContainer);
