import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinTemplates from 'actions/companyAdmin/pins/async/fetchPinTemplates';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import SinglePin from '../presentational/SinglePin';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';

class SinglePinContainer extends Component {
    render = () => <SinglePin />;

    componentDidMount = async () => {
        const { pinId, fetchSinglePinData, fetchSinglePin } = this.props;
        const { payload } = await fetchSinglePin(pinId);
        fetchSinglePinData(pinId);
        fetchDrawingTemplates(payload.pin.drawingID);
    };
}

const mapStateToProps = (_, { match: { params } }) => ({
    pinId: params.id
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePinData: id => {
        return dispatch(fetchPinTemplates(id)), dispatch(fetchCompanyUsers());
    },
    fetchSinglePin: id => {
        return dispatch(fetchSinglePin(id));
    },
    fetchDrawingTemplates: drawingID => {
        dispatch(fetchDrawingTemplates(drawingID));
        dispatch(fetchDrawingDropdownOptions(drawingID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinContainer);
