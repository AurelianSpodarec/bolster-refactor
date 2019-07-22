import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinTemplates from 'actions/companyAdmin/pins/async/fetchPinTemplates';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import SinglePin from '../presentational/SinglePin';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';

class SinglePinContainer extends Component {
    render = () => <SinglePin />;

    componentDidMount = async () => {
        const {
            pinId,
            fetchSinglePinData,
            fetchSinglePin,
            fetchDrawingTemplates,
            // fetchPins
        } = this.props;
        const { payload } = await fetchSinglePin(pinId);
        const {
            pin: { drawingID }
        } = payload;
        fetchSinglePinData(pinId);
        fetchDrawingTemplates(drawingID);
        // ! fetch pins commented out while bug fixed to stop it redirecting back to drawing.
        // fetchPins(drawingID);
    };
}

const mapStateToProps = (_, { match: { params } }) => ({
    pinId: params.id
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePinData: id => {
        dispatch(fetchPinTemplates(id));
        dispatch(fetchCompanyUsers());
    },
    fetchSinglePin: id => dispatch(fetchSinglePin(id)),
    fetchDrawingTemplates: drawingID => {
        dispatch(fetchDrawingTemplates(drawingID));
        dispatch(fetchDrawingDropdownOptions(drawingID));
    },
    fetchPins: drawingID => dispatch(fetchPins('drawing', drawingID))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SinglePinContainer);
