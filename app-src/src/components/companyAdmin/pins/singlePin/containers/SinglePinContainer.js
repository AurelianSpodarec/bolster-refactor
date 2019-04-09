import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinHistories from 'actions/companyAdmin/pins/async/fetchPinHistories';
import fetchPinTemplates from 'actions/companyAdmin/pins/async/fetchPinTemplates';
import fetchCustomFields from 'actions/companyAdmin/pins/async/fetchCustomFields';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import SinglePin from '../presentational/SinglePin';

class SinglePinContainer extends Component {
    render() {
        return <SinglePin />;
    }

    componentDidMount = () => {
        const {
            pinId,
            fetchSinglePin,
            fetchPinHistories,
            fetchPinTemplates,
            fetchCustomFields,
            fetchAllCompanyUsers
        } = this.props;

        fetchSinglePin(pinId);
        fetchPinHistories(pinId);
        fetchPinTemplates(pinId);
        fetchCustomFields(pinId);
        fetchAllCompanyUsers();
    };
}

const mapStateToProps = (_, { match }) => ({
    pinId: match.params['id']
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePin: id => {
        dispatch(fetchSinglePin(id));
    },
    fetchPinHistories: id => {
        dispatch(fetchPinHistories(id));
    },
    fetchPinTemplates: id => {
        dispatch(fetchPinTemplates(id));
    },
    fetchCustomFields: id => {
        dispatch(fetchCustomFields(id));
    },
    fetchAllCompanyUsers: () => {
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinContainer);
